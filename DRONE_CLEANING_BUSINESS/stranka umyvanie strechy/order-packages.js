export const PACKAGE_CATALOG = Object.freeze({
  house_s: Object.freeze({
    id: 'house_s',
    label: 'Pilot Dom S',
    servicePriceEur: 399,
    reservationPriceEur: 399,
    checkoutTitle: 'Founding balik: Pilot Dom S',
    checkoutDescription: 'Limitovana founding ponuka pre mensi rodinny dom s founding cenou a prednostnym poradim po spusteni.',
  }),
  house_m: Object.freeze({
    id: 'house_m',
    label: 'Pilot Dom M',
    servicePriceEur: 649,
    reservationPriceEur: 649,
    checkoutTitle: 'Founding balik: Pilot Dom M',
    checkoutDescription: 'Limitovana founding ponuka pre strechu a jednoduchu fasadu s founding cenou a prednostnym poradim po spusteni.',
  }),
  house_l: Object.freeze({
    id: 'house_l',
    label: 'Pilot Dom L',
    servicePriceEur: 949,
    reservationPriceEur: 949,
    checkoutTitle: 'Founding balik: Pilot Dom L',
    checkoutDescription: 'Limitovana founding ponuka pre vacsi alebo clenitejsi objekt s founding cenou a prednostnym poradim po spusteni.',
  }),
  b2b_audit: Object.freeze({
    id: 'b2b_audit',
    label: 'B2B Audit / Fasada',
    servicePriceEur: 1990,
    reservationPriceEur: 1990,
    checkoutTitle: 'Founding balik: B2B Audit / Fasada',
    checkoutDescription: 'Limitovana founding ponuka pre B2B audit alebo fasadu s founding cenou a prednostnym poradim po spusteni.',
  }),
});

export const PACKAGE_IDS = Object.freeze(Object.keys(PACKAGE_CATALOG));
export const PACKAGE_ID_SET = new Set(PACKAGE_IDS);
export const DEFAULT_COUNTRY = 'Slovensko';
export const DEFAULT_LEAD_SOURCE = 'direct';

const trimValue = (value) => String(value ?? '').trim();

export const normalizePackageId = (value) => trimValue(value);
export const normalizeCountry = (value) => trimValue(value) || DEFAULT_COUNTRY;
export const normalizeLeadSource = (value) => trimValue(value) || DEFAULT_LEAD_SOURCE;

export const getPackageConfig = (value) => PACKAGE_CATALOG[normalizePackageId(value)] || null;
export const isValidPackageId = (value) => PACKAGE_ID_SET.has(normalizePackageId(value));
