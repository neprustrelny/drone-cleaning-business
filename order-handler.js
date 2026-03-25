import {
  getPackageConfig,
  isValidPackageId,
  normalizeCountry,
  normalizeLeadSource,
  normalizePackageId,
} from './DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-packages.js';

export const REQUIRED_ORDER_FIELDS = ['balik', 'typObjektu', 'krajina', 'meno', 'adresa', 'email'];
export const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const trimValue = (value) => String(value ?? '').trim();

export const normalizeOrderPayload = (payload = {}, now = () => new Date().toISOString()) => ({
  balik: normalizePackageId(payload.balik),
  typObjektu: trimValue(payload.typObjektu),
  krajina: normalizeCountry(payload.krajina),
  meno: trimValue(payload.meno),
  adresa: trimValue(payload.adresa),
  email: trimValue(payload.email).toLowerCase(),
  telefon: trimValue(payload.telefon),
  poznamka: trimValue(payload.poznamka),
  leadSource: normalizeLeadSource(payload.leadSource),
  website: trimValue(payload.website),
  submittedAt: trimValue(payload.submittedAt) || now(),
});

export const validateOrderPayload = (payload) => {
  const errors = {};

  REQUIRED_ORDER_FIELDS.forEach((field) => {
    if (!trimValue(payload?.[field])) {
      errors[field] = 'required';
    }
  });

  if (!errors.balik && !isValidPackageId(payload?.balik)) {
    errors.balik = 'invalid';
  }

  if (!errors.email && !EMAIL_REGEX.test(trimValue(payload?.email))) {
    errors.email = 'invalid';
  }

  if (trimValue(payload?.website)) {
    errors.website = 'spam_detected';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const buildReservationSummary = (balik) => {
  const packageConfig = getPackageConfig(balik);

  if (!packageConfig) {
    throw new Error('invalid_balik');
  }

  return {
    packageId: packageConfig.id,
    packageLabel: packageConfig.label,
    servicePriceEur: packageConfig.servicePriceEur,
    reservationPriceEur: packageConfig.reservationPriceEur,
    reservationPriceCents: packageConfig.reservationPriceEur * 100,
  };
};

const defaultCreateCheckoutUrl = async (_payload, env, reservation) => {
  const template = trimValue(env?.TEST_CHECKOUT_URL_TEMPLATE);
  if (!template) {
    return null;
  }

  return template
    .replace('{PACKAGE}', reservation.packageId)
    .replace('{AMOUNT_EUR}', String(reservation.reservationPriceEur))
    .replace('{AMOUNT_CENTS}', String(reservation.reservationPriceCents));
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

export const handleOrderRequest = async (
  request,
  env = {},
  {
    now = () => new Date().toISOString(),
    createCheckoutUrl = defaultCreateCheckoutUrl,
  } = {},
) => {
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

  const reservation = buildReservationSummary(payload.balik);
  const checkoutUrl = await createCheckoutUrl(payload, env, reservation);

  if (env.LEADS?.put) {
    const key = `lead:${payload.submittedAt}:${payload.email}`;
    await env.LEADS.put(
      key,
      JSON.stringify({
        ...payload,
        reservation,
      }),
    );
  }

  return jsonResponse(
    {
      ok: true,
      order: payload,
      reservation,
      checkoutUrl,
      stripeConfigured: Boolean(checkoutUrl),
    },
    { status: 200 },
  );
};
