const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Stripe-Signature",
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...CORS_HEADERS,
    },
  });
}

function parseStripeSignatureHeader(signatureHeader: string): {
  timestamp: number | null;
  v1Signatures: string[];
} {
  const parts = signatureHeader.split(",");
  let timestamp: number | null = null;
  const v1Signatures: string[] = [];

  for (const part of parts) {
    const [rawKey, rawValue] = part.split("=");
    const key = (rawKey || "").trim();
    const value = (rawValue || "").trim();
    if (!key || !value) continue;

    if (key === "t") {
      const parsed = Number(value);
      timestamp = Number.isFinite(parsed) ? parsed : null;
    }

    if (key === "v1") {
      v1Signatures.push(value);
    }
  }

  return { timestamp, v1Signatures };
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

async function computeHmacSha256Hex(secret: string, payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const signatureBytes = new Uint8Array(signatureBuffer);
  return Array.from(signatureBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function verifyStripeSignature(
  payload: string,
  signatureHeader: string,
  secret: string
): Promise<boolean> {
  const { timestamp, v1Signatures } = parseStripeSignatureHeader(signatureHeader);
  if (!timestamp || v1Signatures.length === 0) return false;

  const now = Math.floor(Date.now() / 1000);
  const toleranceSeconds = 300;
  if (Math.abs(now - timestamp) > toleranceSeconds) {
    return false;
  }

  const signedPayload = `${timestamp}.${payload}`;
  const expectedHex = await computeHmacSha256Hex(secret, signedPayload);
  return v1Signatures.some((candidate) => timingSafeEqualHex(candidate, expectedHex));
}

export const onRequest = async (context: any): Promise<Response> => {
  const request: Request = context.request;
  const method = request.method.toUpperCase();

  if (method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  }

  if (method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        ...CORS_HEADERS,
        Allow: "POST, OPTIONS",
      },
    });
  }

  const rawBody = await request.text();
  const signatureHeader = request.headers.get("Stripe-Signature") || "";
  const webhookSecret = String(context.env?.STRIPE_WEBHOOK_SECRET || "").trim();

  if (webhookSecret) {
    const verified = await verifyStripeSignature(rawBody, signatureHeader, webhookSecret);
    if (!verified) {
      return jsonResponse({ ok: false, error: "invalid_stripe_signature" }, 400);
    }
  } else {
    // TODO: Set STRIPE_WEBHOOK_SECRET in Cloudflare env before production usage.
    console.warn("Stripe webhook secret is not configured; signature verification skipped.");
  }

  let eventType = "unknown";
  try {
    const parsed = JSON.parse(rawBody) as { type?: string };
    eventType = typeof parsed.type === "string" ? parsed.type : "unknown";
  } catch {
    // Keep scaffold tolerant for non-JSON payloads.
  }

  console.log("stripe_webhook_received", {
    verified: Boolean(webhookSecret),
    eventType,
    contentLength: rawBody.length,
  });

  return jsonResponse({ ok: true }, 200);
};
