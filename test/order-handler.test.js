import test from 'node:test';
import assert from 'node:assert/strict';

import { handleOrderRequest } from '../order-handler.js';

const validPayload = {
  balik: 'house_m',
  typObjektu: 'rodinny_dom',
  krajina: 'Slovensko',
  meno: 'Jan Novak',
  adresa: 'Skalica 12',
  email: 'jan@example.com',
  telefon: '+421900000000',
  poznamka: 'Pristup zozadu',
  leadSource: 'meta_ads',
  website: '',
};

const makeRequest = (payload, method = 'POST') => {
  const init = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (method !== 'GET' && method !== 'HEAD') {
    init.body = JSON.stringify(payload);
  }

  return new Request('https://example.com/api/order', init);
};

test('backend prijme validny payload a vrati checkoutUrl', async () => {
  const writes = [];
  const checkoutCalls = [];

  const response = await handleOrderRequest(
    makeRequest(validPayload),
    {
      LEADS: {
        put: async (key, value) => {
          writes.push({ key, value: JSON.parse(value) });
        },
      },
    },
    {
      now: () => '2026-03-25T12:00:00.000Z',
      createCheckoutUrl: async (_payload, _env, reservation) => {
        checkoutCalls.push(reservation);
        return `https://checkout.stripe.com/c/pay/${reservation.packageId}`;
      },
    },
  );

  assert.equal(response.status, 200);
  const json = await response.json();
  assert.equal(json.ok, true);
  assert.deepEqual(json.order, {
    balik: 'house_m',
    typObjektu: 'rodinny_dom',
    krajina: 'Slovensko',
    meno: 'Jan Novak',
    adresa: 'Skalica 12',
    email: 'jan@example.com',
    telefon: '+421900000000',
    poznamka: 'Pristup zozadu',
    leadSource: 'meta_ads',
    website: '',
    submittedAt: '2026-03-25T12:00:00.000Z',
  });
  assert.deepEqual(json.reservation, {
    packageId: 'house_m',
    packageLabel: 'Rodinny dom M / strecha + jednoducha fasada',
    servicePriceEur: 590,
    reservationPriceEur: 199,
    reservationPriceCents: 19900,
  });
  assert.equal(json.checkoutUrl, 'https://checkout.stripe.com/c/pay/house_m');
  assert.equal(json.stripeConfigured, true);
  assert.equal(checkoutCalls.length, 1);
  assert.equal(checkoutCalls[0].reservationPriceCents, 19900);
  assert.equal(writes.length, 1);
  assert.equal(writes[0].value.reservation.packageId, 'house_m');
});

test('backend mapuje server-side sumu podla balika', async () => {
  const expectations = [
    ['house_s', 'rodinny_dom', 14900],
    ['house_m', 'rodinny_dom', 19900],
    ['house_l', 'rodinny_dom', 29900],
    ['b2b_audit', 'firemny_objekt', 99000],
  ];

  for (const [balik, typObjektu, expectedAmount] of expectations) {
    const response = await handleOrderRequest(
      makeRequest({ ...validPayload, balik, typObjektu }),
      {},
      {
        createCheckoutUrl: async (_payload, _env, reservation) => `https://example.com/${reservation.packageId}/${reservation.reservationPriceCents}`,
      },
    );

    assert.equal(response.status, 200);
    const json = await response.json();
    assert.equal(json.reservation.packageId, balik);
    assert.equal(json.reservation.reservationPriceCents, expectedAmount);
    assert.equal(json.checkoutUrl, `https://example.com/${balik}/${expectedAmount}`);
  }
});

test('backend odmietne nevalidny balik', async () => {
  const response = await handleOrderRequest(makeRequest({ ...validPayload, balik: '50_eur' }));
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(json.ok, false);
  assert.equal(json.error, 'validation_failed');
  assert.equal(json.errors.balik, 'invalid');
});

test('backend odmietne payload bez typu objektu', async () => {
  const response = await handleOrderRequest(makeRequest({ ...validPayload, typObjektu: '' }));
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(json.errors.typObjektu, 'required');
});

test('backend odmietne neplatny email format', async () => {
  const response = await handleOrderRequest(makeRequest({ ...validPayload, email: 'zly-email' }));
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(json.errors.email, 'invalid');
});

test('backend vrati chybu pre neplatnu HTTP metodu', async () => {
  const response = await handleOrderRequest(makeRequest(validPayload, 'GET'));
  assert.equal(response.status, 405);
  const json = await response.json();
  assert.equal(json.error, 'method_not_allowed');
});
