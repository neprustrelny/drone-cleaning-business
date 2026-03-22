import test from 'node:test';
import assert from 'node:assert/strict';

import { handleOrderRequest } from '../order-handler.js';

const validPayload = {
  balik: '299',
  meno: 'Ján Novák',
  adresa: 'Skalica 12',
  email: 'jan@example.com',
  telefon: '+421900000000',
  poznamka: 'Poznámka',
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

test('backend prijme validný payload', async () => {
  const writes = [];
  const response = await handleOrderRequest(makeRequest(validPayload), {
    LEADS: {
      put: async (key, value) => {
        writes.push({ key, value });
      },
    },
  }, {
    now: () => '2026-03-20T12:00:00.000Z',
  });

  assert.equal(response.status, 200);
  const json = await response.json();
  assert.equal(json.ok, true);
  assert.deepEqual(json.order, {
    balik: '299',
    meno: 'Ján Novák',
    adresa: 'Skalica 12',
    email: 'jan@example.com',
    telefon: '+421900000000',
    poznamka: 'Poznámka',
    submittedAt: '2026-03-20T12:00:00.000Z',
  });
  assert.equal(writes.length, 1);
});

test('backend odmietne payload bez balik', async () => {
  const response = await handleOrderRequest(makeRequest({ ...validPayload, balik: '' }));
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(json.ok, false);
  assert.equal(json.error, 'validation_failed');
  assert.equal(json.errors.balik, 'required');
});

test('backend odmietne payload bez mena', async () => {
  const response = await handleOrderRequest(makeRequest({ ...validPayload, meno: '' }));
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(json.errors.meno, 'required');
});

test('backend odmietne payload bez adresy', async () => {
  const response = await handleOrderRequest(makeRequest({ ...validPayload, adresa: '' }));
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(json.errors.adresa, 'required');
});

test('backend odmietne payload bez emailu', async () => {
  const response = await handleOrderRequest(makeRequest({ ...validPayload, email: '' }));
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(json.errors.email, 'required');
});

test('backend odmietne neplatný email formát', async () => {
  const response = await handleOrderRequest(makeRequest({ ...validPayload, email: 'zly-email' }));
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(json.errors.email, 'invalid');
});

test('backend vráti chybu pre neplatnú HTTP metódu', async () => {
  const response = await handleOrderRequest(makeRequest(validPayload, 'GET'));
  assert.equal(response.status, 405);
  const json = await response.json();
  assert.equal(json.error, 'method_not_allowed');
});
