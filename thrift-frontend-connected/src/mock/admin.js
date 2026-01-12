export const ADMIN_KPIS = {
  ordersToday: 7,
  itemsListed: 124,
  lowStock: 9,
  tradeInsPending: 5,
};

export const ADMIN_USERS = [
  { id: "u1", name: "Aina", email: "aina@mail.com", status: "Active" },
  { id: "u2", name: "Hafiz", email: "hafiz@mail.com", status: "Active" },
  { id: "u3", name: "Mei", email: "mei@mail.com", status: "Disabled" },
];

export const ADMIN_ORDERS = [
  { id: "TFS-10034", customer: "Demo User", status: "Processing", total: 45.0 },
  { id: "TFS-10021", customer: "Aina", status: "Delivered", total: 169.9 },
];

export const ADMIN_TRADEINS = [
  { id: "TI-901", customer: "Hafiz", status: "Reviewing", category: "Men", decision: "—" },
  { id: "TI-902", customer: "Mei", status: "Submitted", category: "Books", decision: "—" },
];
