import test from 'node:test';
import assert from 'node:assert/strict';

import {
  readFormData,
  validateOrderData,
  serializeOrderData,
  resolveCheckoutUrl,
  createOrderSubmitHandler,
} from '../DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-form.js';

const createForm = (values = {}) => ({
  balik: { value: values.balik ?? '' },
  meno: { value: values.meno ?? '' },
  adresa: { value: values.adresa ?? '' },
  email: { value: values.email ?? '' },
  telefon: { value: values.telefon ?? '' },
  poznamka: { value: values.poznamka ?? '' },
});

test('balik je povinný', () => {
  const result = validateOrderData({ balik: '', meno: 'Meno', adresa: 'Adresa', email: 'test@example.com' });
  assert.equal(result.valid, false);
  assert.equal(result.errors.balik, 'required');
});

test('meno, adresa a email sú povinné', () => {
  const result = validateOrderData({ balik: '199', meno: '', adresa: '', email: '' });
  assert.equal(result.valid, false);
  assert.equal(result.errors.meno, 'required');
  assert.equal(result.errors.adresa, 'required');
  assert.equal(result.errors.email, 'required');
});

test('serializeOrderData vytvorí správny payload', () => {
  const payload = serializeOrderData(
    {
      balik: '299',
      meno: ' Ján Novák ',
      adresa: ' Ulica 12 ',
      email: ' jan@example.com ',
      telefon: ' +421900000000 ',
      poznamka: ' prístup zozadu ',
    },
    () => '2026-03-20T10:00:00.000Z',
  );

  assert.deepEqual(payload, {
    balik: '299',
    meno: 'Ján Novák',
    adresa: 'Ulica 12',
    email: 'jan@example.com',
    telefon: '+421900000000',
    poznamka: 'prístup zozadu',
    submittedAt: '2026-03-20T10:00:00.000Z',
  });
});

test('readFormData načíta všetky funnel polia', () => {
  const data = readFormData(createForm({
    balik: '399',
    meno: 'Marek',
    adresa: 'Kassel 1',
    email: 'marek@example.com',
    telefon: '123',
    poznamka: 'poznamka',
  }));

  assert.deepEqual(data, {
    balik: '399',
    meno: 'Marek',
    adresa: 'Kassel 1',
    email: 'marek@example.com',
    telefon: '123',
    poznamka: 'poznamka',
  });
});

test('resolveCheckoutUrl pustí test fallback len na localhoste', () => {
  assert.equal(
    resolveCheckoutUrl({
      apiResult: {},
      fallbackUrl: 'https://buy.stripe.com/test_123',
      locationRef: { hostname: 'localhost', search: '' },
    }),
    'https://buy.stripe.com/test_123',
  );

  assert.equal(
    resolveCheckoutUrl({
      apiResult: {},
      fallbackUrl: 'https://buy.stripe.com/test_123',
      locationRef: { hostname: 'cistastrecha.sk', search: '' },
    }),
    '',
  );
});

test('submit flow sa nespustí pri nevalidnom formulári', async () => {
  let sendCalled = 0;
  let stripeCalled = 0;
  let statusMessage = 'initial';
  const appliedErrors = [];

  const handler = createOrderSubmitHandler({
    readData: () => ({ balik: '', meno: '', adresa: '', email: '' }),
    sendOrder: async () => {
      sendCalled += 1;
    },
    openStripeCheckout: () => {
      stripeCalled += 1;
    },
    showStatus: (message) => {
      statusMessage = message;
    },
    setButtonState: () => {},
    clearErrors: () => {},
    applyErrors: (errors) => appliedErrors.push(errors),
    resetForm: () => {},
  });

  const result = await handler({ preventDefault() {} });

  assert.equal(result.ok, false);
  assert.equal(result.reason, 'validation_failed');
  assert.equal(sendCalled, 0);
  assert.equal(stripeCalled, 0);
  assert.equal(statusMessage, '');
  assert.equal(appliedErrors.length, 1);
  assert.equal(appliedErrors[0].balik, 'required');
  assert.equal(appliedErrors[0].meno, 'required');
  assert.equal(appliedErrors[0].adresa, 'required');
  assert.equal(appliedErrors[0].email, 'required');
});

test('submit flow odošle serializovaný payload a použije checkoutUrl z backendu', async () => {
  const sentPayloads = [];
  const openedUrls = [];

  const handler = createOrderSubmitHandler({
    readData: () => ({
      balik: '199',
      meno: 'Ján Novák',
      adresa: 'Skalica 1',
      email: 'jan@example.com',
      telefon: '0900',
      poznamka: 'Mach',
    }),
    sendOrder: async (payload) => {
      sentPayloads.push(payload);
      return { checkoutUrl: 'https://checkout.stripe.com/c/pay/cs_test_123' };
    },
    resolveStripeUrl: (apiResult) => apiResult.checkoutUrl,
    openStripeCheckout: (checkoutUrl) => {
      openedUrls.push(checkoutUrl);
    },
    showStatus: () => {},
    setButtonState: () => {},
    clearErrors: () => {},
    applyErrors: () => {},
    resetForm: () => {},
    serialize: (data) => serializeOrderData(data, () => '2026-03-20T12:00:00.000Z'),
  });

  const result = await handler({ preventDefault() {} });

  assert.equal(result.ok, true);
  assert.equal(sentPayloads.length, 1);
  assert.deepEqual(openedUrls, ['https://checkout.stripe.com/c/pay/cs_test_123']);
  assert.deepEqual(sentPayloads[0], {
    balik: '199',
    meno: 'Ján Novák',
    adresa: 'Skalica 1',
    email: 'jan@example.com',
    telefon: '0900',
    poznamka: 'Mach',
    submittedAt: '2026-03-20T12:00:00.000Z',
  });
});
