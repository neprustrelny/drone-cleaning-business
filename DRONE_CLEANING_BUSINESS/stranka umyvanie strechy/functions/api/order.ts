const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Stripe-Signature",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_BALIKY = new Set(["199", "299", "399"]);
const RATE_LIMIT_MAX_REQUESTS_PER_MINUTE = 10;

type LeadPayload = {
  balik?: unknown;
  meno?: unknown;
  adresa?: unknown;
  email?: unknown;
  telefon?: unknown;
  poznamka?: unknown;
  website?: unknown;
};

type LeadRecord = {
  createdAt: string;
  clientIp: string;
  userAgent: string;
  balik: string;
  meno: string;
  adresa: string;
  email: string;
  telefon: string;
  poznamka: string;
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

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function truncateForStripe(value: string, maxLength = 400): string {
  const trimmed = asTrimmedString(value);
  return trimmed.length > maxLength ? trimmed.slice(0, maxLength) : trimmed;
}

function getClientIp(request: Request): string {
  const cfIp = request.headers.get("CF-Connecting-IP");
  if (cfIp && cfIp.trim()) return cfIp.trim();

  const forwardedFor = request.headers.get("X-Forwarded-For");
  if (forwardedFor && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  return "unknown";
}

function createLeadId(): string {
  return `lead:${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
}

function getReturnUrl(request: Request, configuredUrl: string, checkoutState: "success" | "cancel"): string {
  if (configuredUrl) {
    return configuredUrl;
  }

  const origin = new URL(request.url).origin;
  if (checkoutState === "success") {
    return `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`;
  }

  return `${origin}/?checkout=cancel`;
}

function readStripeConfig(env: any, request: Request): null | {
  secretKey: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
} {
  const secretKey = asTrimmedString(env?.STRIPE_SECRET_KEY);
  const priceId = asTrimmedString(env?.STRIPE_PRICE_ID_DEPOSIT_50);

  if (!secretKey && !priceId) {
    return null;
  }

  if (!secretKey || !priceId) {
    throw new Error("stripe_config_incomplete");
  }

  return {
    secretKey,
    priceId,
    successUrl: getReturnUrl(request, asTrimmedString(env?.STRIPE_SUCCESS_URL), "success"),
    cancelUrl: getReturnUrl(request, asTrimmedString(env?.STRIPE_CANCEL_URL), "cancel"),
  };
}

async function checkAndIncrementRateLimit(env: any, ip: string): Promise<boolean> {
  const kv = env?.LEADS;
  if (!kv || ip === "unknown") return false;

  const minuteBucket = Math.floor(Date.now() / 60000);
  const key = `rate:${ip}:${minuteBucket}`;

  let currentCount = 0;
  try {
    const existing = await kv.get(key);
    currentCount = existing ? Number(existing) : 0;
    if (!Number.isFinite(currentCount)) currentCount = 0;
  } catch (error) {
    console.error("Rate-limit read failed", error);
    return false;
  }

  currentCount += 1;

  try {
    await kv.put(key, String(currentCount), { expirationTtl: 120 });
  } catch (error) {
    console.error("Rate-limit write failed", error);
  }

  return currentCount > RATE_LIMIT_MAX_REQUESTS_PER_MINUTE;
}

async function storeLeadIfPossible(env: any, leadId: string, leadRecord: Record<string, unknown>): Promise<void> {
  const kv = env?.LEADS;
  if (!kv) return;

  await kv.put(leadId, JSON.stringify(leadRecord));
}

async function notifyWebhookIfConfigured(
  env: any,
  leadRecord: Record<string, unknown>
): Promise<void> {
  const webhookUrl = asTrimmedString(env?.NOTIFY_WEBHOOK_URL);
  if (!webhookUrl) return;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "strecha-api",
        event: "lead_created",
        lead: leadRecord,
      }),
    });

    if (!response.ok) {
      console.error("Notification webhook returned non-2xx", response.status);
    }
  } catch (error) {
    console.error("Notification webhook request failed", error);
  }
}

async function createStripeCheckoutUrl(
  env: any,
  request: Request,
  leadId: string,
  leadRecord: LeadRecord
): Promise<string | null> {
  const stripeConfig = readStripeConfig(env, request);
  if (!stripeConfig) {
    return null;
  }

  const formData = new URLSearchParams();
  formData.set("mode", "payment");
  formData.set("success_url", stripeConfig.successUrl);
  formData.set("cancel_url", stripeConfig.cancelUrl);
  formData.set("client_reference_id", leadId);
  formData.set("customer_email", leadRecord.email);
  formData.set("line_items[0][price]", stripeConfig.priceId);
  formData.set("line_items[0][quantity]", "1");
  formData.set("metadata[lead_id]", leadId);
  formData.set("metadata[balik]", leadRecord.balik);
  formData.set("metadata[meno]", truncateForStripe(leadRecord.meno));
  formData.set("metadata[email]", truncateForStripe(leadRecord.email));
  formData.set("metadata[telefon]", truncateForStripe(leadRecord.telefon, 100));
  formData.set("metadata[adresa]", truncateForStripe(leadRecord.adresa));

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeConfig.secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  let stripeBody: any = null;
  try {
    stripeBody = await response.json();
  } catch {
    stripeBody = null;
  }

  const checkoutUrl = asTrimmedString(stripeBody?.url);
  if (!response.ok || !checkoutUrl) {
    console.error("Stripe checkout session creation failed", {
      status: response.status,
      body: stripeBody,
    });
    throw new Error("stripe_checkout_failed");
  }

  return checkoutUrl;
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

  const ip = getClientIp(request);
  const isRateLimited = await checkAndIncrementRateLimit(context.env, ip);
  if (isRateLimited) {
    return jsonResponse(
      { ok: false, error: "rate_limited", message: "Too many requests. Try again later." },
      429
    );
  }

  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return jsonResponse({ ok: false, error: "invalid_json" }, 400);
  }

  const balik = asTrimmedString(payload.balik);
  const meno = asTrimmedString(payload.meno);
  const adresa = asTrimmedString(payload.adresa);
  const email = asTrimmedString(payload.email).toLowerCase();
  const telefon = asTrimmedString(payload.telefon);
  const poznamka = asTrimmedString(payload.poznamka);
  const website = asTrimmedString(payload.website);

  if (website) {
    return jsonResponse({ ok: false, error: "spam_detected" }, 400);
  }

  if (!ALLOWED_BALIKY.has(balik)) {
    return jsonResponse({ ok: false, error: "invalid_balik" }, 400);
  }

  if (meno.length < 2) {
    return jsonResponse({ ok: false, error: "invalid_meno" }, 400);
  }

  if (adresa.length < 5) {
    return jsonResponse({ ok: false, error: "invalid_adresa" }, 400);
  }

  if (!EMAIL_REGEX.test(email)) {
    return jsonResponse({ ok: false, error: "invalid_email" }, 400);
  }

  const leadId = createLeadId();
  const leadRecord: LeadRecord = {
    createdAt: new Date().toISOString(),
    clientIp: ip,
    userAgent: request.headers.get("User-Agent") || "",
    balik,
    meno,
    adresa,
    email,
    telefon,
    poznamka,
  };

  try {
    await storeLeadIfPossible(context.env, leadId, {
      id: leadId,
      ...leadRecord,
    });
  } catch (error) {
    console.error("Lead KV storage failed", error);
  }

  await notifyWebhookIfConfigured(context.env, {
    id: leadId,
    ...leadRecord,
  });

  let checkoutUrl: string | null = null;
  let stripeConfigured = false;
  try {
    checkoutUrl = await createStripeCheckoutUrl(context.env, request, leadId, leadRecord);
    stripeConfigured = Boolean(checkoutUrl);
  } catch (error) {
    if (error instanceof Error && error.message === "stripe_config_incomplete") {
      return jsonResponse({ ok: false, error: "stripe_config_incomplete" }, 500);
    }

    return jsonResponse({ ok: false, error: "stripe_checkout_failed" }, 502);
  }

  return jsonResponse({ ok: true, leadId, checkoutUrl, stripeConfigured }, 200);
};
