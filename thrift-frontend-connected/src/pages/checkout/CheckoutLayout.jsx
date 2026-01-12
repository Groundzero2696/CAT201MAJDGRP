import { Outlet, Link, useLocation } from "react-router-dom";

const steps = [
  { path: "/checkout", label: "Address" },
  { path: "/checkout/delivery", label: "Delivery" },
  { path: "/checkout/payment", label: "Payment" },
  { path: "/checkout/confirm", label: "Confirm" },
];

export default function CheckoutLayout() {
  const loc = useLocation();
  const idx = steps.findIndex((s) => s.path === loc.pathname);

  return (
    <>
      <h1 className="collectionTitle">Checkout</h1>

      <div className="note" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        {steps.map((s, i) => (
          <Link
            key={s.path}
            to={s.path}
            className="pill"
            style={{
              background: i === idx ? "var(--brand)" : "var(--surface)",
              color: i === idx ? "#fff" : "var(--muted)",
              borderColor: i === idx ? "var(--brand)" : "var(--border)",
              fontWeight: i === idx ? 900 : 600,
            }}
          >
            {i + 1}. {s.label}
          </Link>
        ))}
      </div>

      <Outlet />
    </>
  );
}
