import {
  DEFAULT_COUNTRY,
  DEFAULT_LEAD_SOURCE,
  getPackageConfig,
  normalizeCountry,
  normalizeLeadSource,
  normalizePackageId,
} from './order-packages.js';

export const REQUIRED_FIELDS = ['balik', 'typObjektu', 'krajina', 'meno', 'adresa', 'email'];
export const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const trimValue = (value) => String(value ?? '').trim();

export const readFormData = (form) => ({
  balik: normalizePackageId(form?.balik?.value),
  typObjektu: trimValue(form?.typObjektu?.value),
  krajina: normalizeCountry(form?.krajina?.value),
  meno: trimValue(form?.meno?.value),
  adresa: trimValue(form?.adresa?.value),
  email: trimValue(form?.email?.value).toLowerCase(),
  telefon: trimValue(form?.telefon?.value),
  poznamka: trimValue(form?.poznamka?.value),
  leadSource: normalizeLeadSource(form?.leadSource?.value),
  website: trimValue(form?.website?.value),
});

export const validateOrderData = (data) => {
  const errors = {};

  REQUIRED_FIELDS.forEach((field) => {
    if (!trimValue(data?.[field])) {
      errors[field] = 'required';
    }
  });

  if (!errors.balik && !getPackageConfig(data?.balik)) {
    errors.balik = 'invalid';
  }

  if (!errors.email && !EMAIL_REGEX.test(trimValue(data?.email))) {
    errors.email = 'invalid';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const serializeOrderData = (data, now = () => new Date().toISOString()) => ({
  balik: normalizePackageId(data?.balik),
  typObjektu: trimValue(data?.typObjektu),
  krajina: normalizeCountry(data?.krajina),
  meno: trimValue(data?.meno),
  adresa: trimValue(data?.adresa),
  email: trimValue(data?.email).toLowerCase(),
  telefon: trimValue(data?.telefon),
  poznamka: trimValue(data?.poznamka),
  leadSource: normalizeLeadSource(data?.leadSource),
  website: trimValue(data?.website),
  submittedAt: now(),
});

export const resolveLeadSource = ({ locationRef, documentRef } = {}) => {
  const params = new URLSearchParams(locationRef?.search || '');

  for (const key of ['leadSource', 'lead_source', 'utm_source', 'source']) {
    const value = trimValue(params.get(key));
    if (value) {
      return value;
    }
  }

  const referrer = trimValue(documentRef?.referrer);
  if (referrer) {
    try {
      return new URL(referrer).hostname || DEFAULT_LEAD_SOURCE;
    } catch {
      return referrer;
    }
  }

  return DEFAULT_LEAD_SOURCE;
};

export const resolveCheckoutUrl = ({ apiResult } = {}) => trimValue(apiResult?.checkoutUrl);

export const getCheckoutStatusFromLocation = (locationRef) => {
  const params = new URLSearchParams(locationRef?.search || '');
  const checkoutStatus = params.get('checkout');

  if (checkoutStatus === 'success') {
    return {
      message: 'Platba founding balika bola dokoncena. Dalsi krok ti potvrdime e-mailom.',
      isError: false,
    };
  }

  if (checkoutStatus === 'cancel') {
    return {
      message: 'Platba founding balika nebola dokoncena. Formular mozes odoslat znova.',
      isError: true,
    };
  }

  return null;
};

export const createOrderSubmitHandler = ({
  readData,
  validate = validateOrderData,
  serialize = serializeOrderData,
  sendOrder,
  resolveStripeUrl = ({ checkoutUrl }) => trimValue(checkoutUrl),
  openStripeCheckout,
  showStatus,
  setButtonState,
  getButtonDisabled = () => false,
  clearErrors = () => {},
  applyErrors = () => {},
  resetForm = () => {},
  logError = console.error,
}) => async (event) => {
  event?.preventDefault?.();

  if (getButtonDisabled()) {
    return { ok: false, reason: 'button_disabled' };
  }

  clearErrors();
  const data = readData();
  const validation = validate(data);

  if (!validation.valid) {
    applyErrors(validation.errors);
    showStatus('', { isError: false });
    return {
      ok: false,
      reason: 'validation_failed',
      errors: validation.errors,
    };
  }

  showStatus('Spracovavame vybrany founding balik...', { isError: false });
  setButtonState(true);

  try {
    const payload = serialize(data);
    const apiResult = await sendOrder(payload);
    const checkoutUrl = trimValue(resolveStripeUrl(apiResult));

    if (!checkoutUrl) {
      throw new Error('Stripe checkout is not configured.');
    }

    showStatus('Objednavku mame. Presmerovavame ta na platbu vybraneho balika v Stripe.', { isError: false });
    resetForm();
    openStripeCheckout(checkoutUrl);
    return { ok: true, payload, apiResult, checkoutUrl };
  } catch (error) {
    logError('Odoslanie objednavky zlyhalo', error);
    showStatus('Balik sa neodoslal alebo checkout nie je pripraveny. Skus znova alebo napis na strechy@dronservis.sk.', {
      isError: true,
    });
    return { ok: false, reason: 'send_failed', error };
  } finally {
    setButtonState(false);
  }
};

export const createOrderApiClient = ({ fetchImpl, endpoint }) => async (payload) => {
  const response = await fetchImpl(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let responseBody = null;
  try {
    responseBody = await response.json();
  } catch {
    responseBody = null;
  }

  if (!response.ok) {
    const error = new Error(`Order API responded with ${response.status}`);
    error.status = response.status;
    error.responseBody = responseBody;
    throw error;
  }

  return responseBody || {};
};

export const initOrderForm = ({
  documentRef = document,
  fetchImpl = fetch,
  windowRef = window,
  orderEndpoint = '/api/order',
} = {}) => {
  const form = documentRef.getElementById('orderForm');
  const statusBox = documentRef.getElementById('status');
  const checkoutButton = documentRef.getElementById('checkoutButton');

  if (!form || !statusBox || !checkoutButton) {
    return null;
  }

  const locationRef = windowRef.location || { hostname: '', search: '' };

  if (form.krajina && !form.krajina.value) {
    form.krajina.value = DEFAULT_COUNTRY;
  }

  const showStatus = (message, { isError = false } = {}) => {
    if (!message) {
      statusBox.style.display = 'none';
      statusBox.textContent = '';
      return;
    }

    statusBox.textContent = message;
    statusBox.style.display = 'block';
    statusBox.style.background = isError ? 'rgba(248, 113, 113, 0.18)' : 'rgba(34, 197, 94, 0.15)';
    statusBox.style.color = isError ? '#991b1b' : 'var(--success-dark)';
  };

  const initialCheckoutStatus = getCheckoutStatusFromLocation(locationRef);
  if (initialCheckoutStatus) {
    showStatus(initialCheckoutStatus.message, { isError: initialCheckoutStatus.isError });
  }

  const setButtonState = (isDisabled) => {
    checkoutButton.dataset.disabled = isDisabled ? 'true' : 'false';
    if (isDisabled) {
      checkoutButton.setAttribute('aria-disabled', 'true');
      checkoutButton.setAttribute('aria-busy', 'true');
      checkoutButton.setAttribute('tabindex', '-1');
      return;
    }

    checkoutButton.removeAttribute('aria-disabled');
    checkoutButton.removeAttribute('aria-busy');
    checkoutButton.removeAttribute('tabindex');
  };

  const resetFieldState = (field) => {
    if (field) {
      field.style.borderColor = 'var(--border)';
    }
  };

  const clearErrors = () => {
    [...REQUIRED_FIELDS, 'email'].forEach((fieldName) => {
      resetFieldState(documentRef.getElementById(fieldName));
    });
  };

  const applyErrors = (errors) => {
    Object.keys(errors).forEach((fieldName) => {
      const field = documentRef.getElementById(fieldName);
      if (field) {
        field.style.borderColor = '#dc2626';
      }
    });
  };

  const sendOrder = createOrderApiClient({
    fetchImpl,
    endpoint: orderEndpoint,
  });

  const openStripeCheckout = (checkoutUrl) => {
    windowRef.location.assign(checkoutUrl);
  };

  const handleCheckoutClick = createOrderSubmitHandler({
    readData: () => ({
      ...readFormData(form),
      leadSource: resolveLeadSource({ locationRef, documentRef }),
    }),
    sendOrder,
    resolveStripeUrl: (apiResult) => resolveCheckoutUrl({ apiResult }),
    openStripeCheckout,
    showStatus,
    setButtonState,
    getButtonDisabled: () => checkoutButton.dataset.disabled === 'true',
    clearErrors,
    applyErrors,
    resetForm: () => {
      form.reset();
      if (form.krajina) {
        form.krajina.value = DEFAULT_COUNTRY;
      }
    },
  });

  checkoutButton.addEventListener('click', handleCheckoutClick);

  return {
    form,
    checkoutButton,
    handleCheckoutClick,
  };
};

if (typeof document !== 'undefined') {
  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
  initOrderForm();
}
