import { handleOrderRequest, jsonResponse } from './order-handler.js';

export { handleOrderRequest } from './order-handler.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/order') {
      return handleOrderRequest(request, env);
    }

    return jsonResponse({ ok: false, error: 'not_found' }, { status: 404 });
  },
};
