const API = ""; // use Vite dev proxy

async function request(path, { method = "GET", body } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    throw new Error(data?.error || `HTTP ${res.status}`);
  }
  return data;
}

export const api = {
  // Promo
  getPromo: () => request("/api/promo"),
  adminUpdatePromo: (announcement, freeShippingThreshold) =>
    request("/api/admin/promo", {
      method: "PUT",
      body: { announcement, freeShippingThreshold },
    }),

  // Products
  getProducts: (params = {}) => {
    const usp = new URLSearchParams(params);
    const qs = usp.toString() ? `?${usp.toString()}` : "";
    return request(`/api/products${qs}`);
  },
  getProductById: (id) =>
    request(`/api/product?id=${encodeURIComponent(id)}`),

  // Cart
  getCart: (userId = "demo") =>
    request(`/api/cart?userId=${encodeURIComponent(userId)}`),
  cartAdd: (item, userId = "demo") =>
    request("/api/cart/add", { method: "POST", body: { userId, ...item } }),
  cartQty: (id, qty, userId = "demo") =>
    request("/api/cart/qty", { method: "POST", body: { userId, id, qty } }),
  cartRemove: (id, userId = "demo") =>
    request("/api/cart/remove", { method: "POST", body: { userId, id } }),

  // Checkout + Orders
  checkout: (userId = "demo") =>
    request("/api/checkout", { method: "POST", body: { userId } }),
  getOrders: (userId = "demo") =>
    request(`/api/orders?userId=${encodeURIComponent(userId)}`),

  // Trade-ins
  submitTradeIn: ({ category, notes }, userId = "demo") =>
    request("/api/tradeins/submit", {
      method: "POST",
      body: { userId, category, notes },
    }),
  getTradeIns: (userId = "demo") =>
    request(`/api/tradeins?userId=${encodeURIComponent(userId)}`),

  // Admin login (demo endpoint)
  adminLogin: (email, password) =>
    request("/api/admin/login", { method: "POST", body: { email, password } }),
};
