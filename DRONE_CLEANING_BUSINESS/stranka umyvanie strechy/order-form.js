export const REQUIRED_FIELDS = ['balik', 'meno', 'adresa', 'email'];
export const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const LOCAL_TEST_HOSTNAMES = new Set(['localhost', '127.0.0.1']);
const trimValue = (value) => String(value ?? '').trim();

export const readFormData = (form) => ({
  balik: trimValue(form?.balik?.value),
  meno: trimValue(form?.meno?.value),
  adresa: trimValue(form?.adresa?.value),
  email: trimValue(form?.email?.value),
  telefon: trimValue(form?.telefon?.value),
  poznamka: trimValue(form?.poznamka?.value),
});

export const validateOrderData = (data) => {
  const errors = {};

  REQUIRED_FIELDS.forEach((field) => {
    if (!trimValue(data?.[field])) {
      errors[field] = 'required';
    }
  });

  if (!errors.email && !EMAIL_REGEX.test(trimValue(data?.email))) {
    errors.email = 'invalid';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const serializeOrderData = (data, now = () => new Date().toISOString()) => ({
  balik: trimValue(data?.balik),
  meno: trimValue(data?.meno),
  adresa: trimValue(data?.adresa),
  email: trimValue(data?.email),
  telefon: trimValue(data?.telefon),
  poznamka: trimValue(data?.poznamka),
  submittedAt: now(),
});

export const resolveCheckoutUrl = ({ apiResult, fallbackUrl = '', locationRef } = {}) => {
  const checkoutUrl = trimValue(apiResult?.checkoutUrl);
  if (checkoutUrl) {
    return checkoutUrl;
  }

  const fallback = trimValue(fallbackUrl);
  if (!fallback) {
    return '';
  }

  const hostname = trimValue(locationRef?.hostname).toLowerCase();
  const search = locationRef?.search || '';
  const params = new URLSearchParams(search);
  const allowTestStripe = params.get('allowTestStripe') === '1';

  if (LOCAL_TEST_HOSTNAMES.has(hostname) || allowTestStripe) {
    return fallback;
  }

  return '';
};

export const getCheckoutStatusFromLocation = (locationRef) => {
  const params = new URLSearchParams(locationRef?.search || '');
  const checkoutStatus = params.get('checkout');

  if (checkoutStatus === 'success') {
    return {
      message: 'Platba zálohy 50 € prebehla úspešne. Ozveme sa s termínom.',
      isError: false,
    };
  }

  if (checkoutStatus === 'cancel') {
    return {
      message: 'Platba nebola dokončená. Formulár môžeš odoslať znova.',
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

  showStatus('Spracovávame objednávku...', { isError: false });
  setButtonState(true);

  try {
    const payload = serialize(data);
    const apiResult = await sendOrder(payload);
    const checkoutUrl = trimValue(resolveStripeUrl(apiResult));

    if (!checkoutUrl) {
      throw new Error('Stripe checkout is not configured.');
    }

    showStatus('Objednávku máme. Presmerovávame na zálohu 50 € v Stripe.', { isError: false });
    resetForm();
    openStripeCheckout(checkoutUrl);
    return { ok: true, payload, apiResult, checkoutUrl };
  } catch (error) {
    logError('Odoslanie objednávky zlyhalo', error);
    showStatus('Odoslanie zlyhalo alebo Stripe nie je pripravený. Skús znova alebo napíš na strechy@dronservis.sk.', {
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

  const stripeFallbackUrl = checkoutButton.dataset.stripeFallbackUrl || '';
  const locationRef = windowRef.location || { hostname: '', search: '' };

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
    readData: () => readFormData(form),
    sendOrder,
    resolveStripeUrl: (apiResult) => resolveCheckoutUrl({
      apiResult,
      fallbackUrl: stripeFallbackUrl,
      locationRef,
    }),
    openStripeCheckout,
    showStatus,
    setButtonState,
    getButtonDisabled: () => checkoutButton.dataset.disabled === 'true',
    clearErrors,
    applyErrors,
    resetForm: () => form.reset(),
  });

  checkoutButton.addEventListener('click', handleCheckoutClick);

  return {
    form,
    checkoutButton,
    handleCheckoutClick,
  };
};

if (typeof document !== 'undefined') {
  document.getElementById('year').textContent = new Date().getFullYear();
  initOrderForm();
}
