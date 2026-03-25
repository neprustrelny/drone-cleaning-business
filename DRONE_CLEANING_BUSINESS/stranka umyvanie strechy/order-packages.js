export const PACKAGE_CATALOG = Object.freeze({
  house_s: Object.freeze({
    id: 'house_s',
    label: 'Rodinny dom S',
    servicePriceEur: 349,
    reservationPriceEur: 149,
    checkoutTitle: 'Zakladatelska rezervacia: Rodinny dom S',
    checkoutDescription: 'Pilotny slot pre mensi rodinny dom. Rezervacia sa odpocita z finalnej ceny.',
  }),
  house_m: Object.freeze({
    id: 'house_m',
    label: 'Rodinny dom M / strecha + jednoducha fasada',
    servicePriceEur: 590,
    reservationPriceEur: 199,
    checkoutTitle: 'Zakladatelska rezervacia: Rodinny dom M',
    checkoutDescription: 'Pilotny slot pre strechu a jednoduchu fasadu. Rezervacia sa odpocita z finalnej ceny.',
  }),
  house_l: Object.freeze({
    id: 'house_l',
    label: 'Velka alebo clenita strecha',
    servicePriceEur: 890,
    reservationPriceEur: 299,
    checkoutTitle: 'Zakladatelska rezervacia: Velka alebo clenita strecha',
    checkoutDescription: 'Pilotny slot pre vacsi alebo zlozitejsi objekt. Rezervacia sa odpocita z finalnej ceny.',
  }),
  b2b_audit: Object.freeze({
    id: 'b2b_audit',
    label: 'Firma / obec / kostol / hala / vacsi objekt',
    servicePriceEur: 990,
    reservationPriceEur: 990,
    checkoutTitle: 'Pilotny audit a prioritny slot',
    checkoutDescription: 'Audit a prioritny slot pre vacsi objekt. Pri naslednej realizacii sa odpocita podla podmienok a rozsahu.',
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
