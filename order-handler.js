export const REQUIRED_ORDER_FIELDS = ['balik', 'meno', 'adresa', 'email'];
export const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const trimValue = (value) => String(value ?? '').trim();

export const normalizeOrderPayload = (payload = {}, now = () => new Date().toISOString()) => ({
  balik: trimValue(payload.balik),
  meno: trimValue(payload.meno),
  adresa: trimValue(payload.adresa),
  email: trimValue(payload.email),
  telefon: trimValue(payload.telefon),
  poznamka: trimValue(payload.poznamka),
  submittedAt: trimValue(payload.submittedAt) || now(),
});

export const validateOrderPayload = (payload) => {
  const errors = {};

  REQUIRED_ORDER_FIELDS.forEach((field) => {
    if (!trimValue(payload?.[field])) {
      errors[field] = 'required';
    }
  });

  if (!errors.email && !EMAIL_REGEX.test(trimValue(payload?.email))) {
    errors.email = 'invalid';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const jsonResponse = (payload, init = {}) => {
  const headers = new Headers(init.headers || {});
  if (!headers.has('content-type')) {
    headers.set('content-type', 'application/json; charset=utf-8');
  }

  return new Response(JSON.stringify(payload), {
    ...init,
    headers,
  });
};

export const handleOrderRequest = async (request, env = {}, { now = () => new Date().toISOString() } = {}) => {
  if (request.method !== 'POST') {
    return jsonResponse({ ok: false, error: 'method_not_allowed' }, { status: 405 });
  }

  let rawPayload;
  try {
    rawPayload = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const payload = normalizeOrderPayload(rawPayload, now);
  const validation = validateOrderPayload(payload);

  if (!validation.valid) {
    return jsonResponse({ ok: false, error: 'validation_failed', errors: validation.errors }, { status: 400 });
  }

  if (env.LEADS?.put) {
    const key = `lead:${payload.submittedAt}:${payload.email}`;
    await env.LEADS.put(key, JSON.stringify(payload));
  }

  return jsonResponse({ ok: true, order: payload }, { status: 200 });
};
