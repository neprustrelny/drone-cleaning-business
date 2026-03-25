import test from 'node:test';
import assert from 'node:assert/strict';

import {
  readFormData,
  validateOrderData,
  serializeOrderData,
  resolveLeadSource,
  resolveCheckoutUrl,
  createOrderSubmitHandler,
} from '../DRONE_CLEANING_BUSINESS/stranka umyvanie strechy/order-form.js';

const createForm = (values = {}) => ({
  balik: { value: values.balik ?? '' },
  typObjektu: { value: values.typObjektu ?? '' },
  krajina: { value: values.krajina ?? '' },
  meno: { value: values.meno ?? '' },
  adresa: { value: values.adresa ?? '' },
  email: { value: values.email ?? '' },
  telefon: { value: values.telefon ?? '' },
  poznamka: { value: values.poznamka ?? '' },
  leadSource: { value: values.leadSource ?? '' },
  website: { value: values.website ?? '' },
});

test('balik je povinny', () => {
  const result = validateOrderData({
    balik: '',
    typObjektu: 'rodinny_dom',
    krajina: 'Slovensko',
    meno: 'Meno',
    adresa: 'Adresa',
    email: 'test@example.com',
  });
  assert.equal(result.valid, false);
  assert.equal(result.errors.balik, 'required');
});

test('balik musi byt validny identifikator', () => {
  const result = validateOrderData({
    balik: '50_eur',
    typObjektu: 'rodinny_dom',
    krajina: 'Slovensko',
    meno: 'Meno',
    adresa: 'Adresa',
    email: 'test@example.com',
  });
  assert.equal(result.valid, false);
  assert.equal(result.errors.balik, 'invalid');
});

test('typ objektu, krajina, meno, adresa a email su povinne', () => {
  const result = validateOrderData({
    balik: 'house_s',
    typObjektu: '',
    krajina: '',
    meno: '',
    adresa: '',
    email: '',
  });
  assert.equal(result.valid, false);
  assert.equal(result.errors.typObjektu, 'required');
  assert.equal(result.errors.krajina, 'required');
  assert.equal(result.errors.meno, 'required');
  assert.equal(result.errors.adresa, 'required');
  assert.equal(result.errors.email, 'required');
});

test('serializeOrderData vytvori spravny payload', () => {
  const payload = serializeOrderData(
    {
      balik: ' house_m ',
      typObjektu: ' rodinny_dom ',
      krajina: ' Slovensko ',
      meno: ' Jan Novak ',
      adresa: ' Ulica 12 ',
      email: ' JAN@example.com ',
      telefon: ' +421900000000 ',
      poznamka: ' pristup zozadu ',
      leadSource: ' meta_ads ',
      website: ' ',
    },
    () => '2026-03-25T10:00:00.000Z',
  );

  assert.deepEqual(payload, {
    balik: 'house_m',
    typObjektu: 'rodinny_dom',
    krajina: 'Slovensko',
    meno: 'Jan Novak',
    adresa: 'Ulica 12',
    email: 'jan@example.com',
    telefon: '+421900000000',
    poznamka: 'pristup zozadu',
    leadSource: 'meta_ads',
    website: '',
    submittedAt: '2026-03-25T10:00:00.000Z',
  });
});

test('readFormData nacita vsetky funnel polia', () => {
  const data = readFormData(createForm({
    balik: 'house_l',
    typObjektu: 'rodinny_dom',
    krajina: 'Nemecko',
    meno: 'Marek',
    adresa: 'Kassel 1',
    email: 'marek@example.com',
    telefon: '123',
    poznamka: 'poznamka',
    leadSource: 'google_ads',
    website: '',
  }));

  assert.deepEqual(data, {
    balik: 'house_l',
    typObjektu: 'rodinny_dom',
    krajina: 'Nemecko',
    meno: 'Marek',
    adresa: 'Kassel 1',
    email: 'marek@example.com',
    telefon: '123',
    poznamka: 'poznamka',
    leadSource: 'google_ads',
    website: '',
  });
});

test('resolveLeadSource uprednostni utm_source', () => {
  assert.equal(
    resolveLeadSource({
      locationRef: { search: '?utm_source=meta_ads' },
      documentRef: { referrer: 'https://example.com/' },
    }),
    'meta_ads',
  );

  assert.equal(
    resolveLeadSource({
      locationRef: { search: '' },
      documentRef: { referrer: 'https://google.com/search?q=strecha' },
    }),
    'google.com',
  );
});

test('resolveCheckoutUrl vrati checkoutUrl z backendu', () => {
  assert.equal(
    resolveCheckoutUrl({
      apiResult: { checkoutUrl: 'https://checkout.stripe.com/c/pay/cs_live_123' },
    }),
    'https://checkout.stripe.com/c/pay/cs_live_123',
  );
});

test('submit flow sa nespusti pri nevalidnom formulari', async () => {
  let sendCalled = 0;
  let stripeCalled = 0;
  let statusMessage = 'initial';
  const appliedErrors = [];

  const handler = createOrderSubmitHandler({
    readData: () => ({ balik: '', typObjektu: '', krajina: '', meno: '', adresa: '', email: '' }),
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
  assert.equal(appliedErrors[0].typObjektu, 'required');
  assert.equal(appliedErrors[0].krajina, 'required');
  assert.equal(appliedErrors[0].meno, 'required');
  assert.equal(appliedErrors[0].adresa, 'required');
  assert.equal(appliedErrors[0].email, 'required');
});

test('submit flow odosle serializovany payload a pouzije checkoutUrl z backendu', async () => {
  const sentPayloads = [];
  const openedUrls = [];

  const handler = createOrderSubmitHandler({
    readData: () => ({
      balik: 'house_s',
      typObjektu: 'rodinny_dom',
      krajina: 'Slovensko',
      meno: 'Jan Novak',
      adresa: 'Skalica 1',
      email: 'jan@example.com',
      telefon: '0900',
      poznamka: 'Mach',
      leadSource: 'meta_ads',
      website: '',
    }),
    sendOrder: async (payload) => {
      sentPayloads.push(payload);
      return { checkoutUrl: 'https://checkout.stripe.com/c/pay/cs_live_123' };
    },
    openStripeCheckout: (checkoutUrl) => {
      openedUrls.push(checkoutUrl);
    },
    showStatus: () => {},
    setButtonState: () => {},
    clearErrors: () => {},
    applyErrors: () => {},
    resetForm: () => {},
    serialize: (data) => serializeOrderData(data, () => '2026-03-25T12:00:00.000Z'),
  });

  const result = await handler({ preventDefault() {} });

  assert.equal(result.ok, true);
  assert.equal(sentPayloads.length, 1);
  assert.deepEqual(openedUrls, ['https://checkout.stripe.com/c/pay/cs_live_123']);
  assert.deepEqual(sentPayloads[0], {
    balik: 'house_s',
    typObjektu: 'rodinny_dom',
    krajina: 'Slovensko',
    meno: 'Jan Novak',
    adresa: 'Skalica 1',
    email: 'jan@example.com',
    telefon: '0900',
    poznamka: 'Mach',
    leadSource: 'meta_ads',
    website: '',
    submittedAt: '2026-03-25T12:00:00.000Z',
  });
});
