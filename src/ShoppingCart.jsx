import React, { useMemo, useState } from "react";

/**
 * ShoppingCart.jsx
 * A self-contained shopping cart + checkout UI (shipping + payment).
 *
 * Usage:
 *   import ShoppingCart from "./ShoppingCart";
 *   export default function App() { return <ShoppingCart />; }
 *
 * Notes:
 * - No external libraries required.
 * - Data is mocked (replace `initialCart` with your real cart source).
 */

const money = (n) =>
  new Intl.NumberFormat("en-MY", { style: "currency", currency: "MYR" }).format(
    Number(n || 0)
  );

const clampInt = (value, min, max) => {
  const v = Number.parseInt(value, 10);
  if (Number.isNaN(v)) return min;
  return Math.min(max, Math.max(min, v));
};

const initialCart = [
  {
    id: "sku-vie-001",
    name: "Viesteni Polo",
    price: 45.0,
    image:
      "https://images.unsplash.com/photo-1520975958225-2fdf6f5f8b77?auto=format&fit=crop&w=500&q=60",
    size: "M",
    qty: 1,
    stock: 8,
  },
  // Add more items if you want:
  // {
  //   id: "sku-cla-002",
  //   name: "Classics T‑Shirt",
  //   price: 19.0,
  //   image: "https://images.unsplash.com/photo-1520975682030-6e5c4c6df7e6?auto=format&fit=crop&w=500&q=60",
  //   size: "L",
  //   qty: 2,
  //   stock: 12,
  // },
];

const SHIPPING_METHODS = [
  { id: "standard", label: "Standard (3–5 business days)", fee: 8.0 },
  { id: "express", label: "Express (1–2 business days)", fee: 15.0 },
  { id: "pickup", label: "Self pickup", fee: 0.0 },
];

const PAYMENT_METHODS = [
  { id: "card", label: "Card (Visa/Mastercard)" },
  { id: "fpx", label: "FPX / Online Banking" },
  { id: "cod", label: "Cash on Delivery" },
];

function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div style={styles.modalOverlay} role="dialog" aria-modal="true">
      <div style={styles.modalCard}>
        <div style={styles.modalHeader}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
          <button style={styles.iconBtn} onClick={onClose} aria-label="Close">
  <span style={styles.iconX}>✕</span>
</button>


        </div>
        <div style={{ padding: 16 }}>{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children, hint }) {
  return (
    <div style={{ display: "grid", gap: 6, minWidth: 0 }}>
      <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
      {children}
      {hint ? (
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
          {hint}
        </div>
      ) : null}
    </div>
  );
}


function Input(props) {
  return <input {...props} style={{ ...styles.input, ...(props.style || {}) }} />;
}

function Select(props) {
  return (
    <select {...props} style={{ ...styles.input, ...(props.style || {}) }} />
  );
}

function RadioRow({ name, options, value, onChange }) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {options.map((opt) => (
        <label
          key={opt.id}
          style={{
            ...styles.radioRow,
            borderColor: value === opt.id ? "#111827" : "#e5e7eb",
          }}
        >
          <input
            type="radio"
            name={name}
            value={opt.id}
            checked={value === opt.id}
            onChange={() => onChange(opt.id)}
          />
          <div style={{ display: "grid", gap: 2 }}>
            <div style={{ fontWeight: 700 }}>
              {opt.label}{" "}
              {"fee" in opt ? (
                <span style={{ fontWeight: 600, color: "#374151" }}>
                  · {money(opt.fee)}
                </span>
              ) : null}
            </div>
          </div>
        </label>
      ))}
    </div>
  );
}

export default function ShoppingCart({
  onContinueShopping, // optional callback
}) {
  const [items, setItems] = useState(initialCart);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Checkout state
  const [step, setStep] = useState(1); // 1=shipping, 2=payment, 3=review
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    country: "Malaysia",
  });

  const [card, setCard] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [touched, setTouched] = useState({});

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );

  const shippingFee = useMemo(() => {
    const m = SHIPPING_METHODS.find((x) => x.id === shippingMethod);
    return m ? m.fee : 0;
  }, [shippingMethod]);

  const total = useMemo(() => subtotal + shippingFee, [subtotal, shippingFee]);

  const isEmpty = items.length === 0;

  const updateQty = (id, nextQty) => {
    setItems((prev) =>
      prev
        .map((it) =>
          it.id === id ? { ...it, qty: clampInt(nextQty, 1, it.stock || 99) } : it
        )
        .filter((it) => it.qty > 0)
    );
  };

  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  const openCheckout = () => {
    if (isEmpty) return;
    setStep(1);
    setTouched({});
    setCheckoutOpen(true);
  };

  const closeCheckout = () => setCheckoutOpen(false);

  const requiredShippingFields = [
    "fullName",
    "phone",
    "email",
    "address1",
    "city",
    "state",
    "postcode",
    "country",
  ];

  const shippingErrors = useMemo(() => {
    const e = {};
    for (const k of requiredShippingFields) {
      const v = String(shipping[k] || "").trim();
      if (!v) e[k] = "Required";
    }
    // simple email/phone checks (basic; customize as needed)
    const email = String(shipping.email || "").trim();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) e.email = "Invalid email format";
    const phone = String(shipping.phone || "").trim();
    if (phone && phone.length < 8) e.phone = "Phone looks too short";
    return e;
  }, [shipping]);

  const cardErrors = useMemo(() => {
    if (paymentMethod !== "card") return {};
    const e = {};
    const cn = String(card.cardName || "").trim();
    const num = String(card.cardNumber || "").replace(/\s+/g, "");
    const ex = String(card.expiry || "").trim();
    const cvc = String(card.cvc || "").trim();

    if (!cn) e.cardName = "Required";
    if (!num) e.cardNumber = "Required";
    else if (!/^\d{13,19}$/.test(num)) e.cardNumber = "Enter 13–19 digits";
    if (!ex) e.expiry = "Required";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(ex)) e.expiry = "Use MM/YY";
    if (!cvc) e.cvc = "Required";
    else if (!/^\d{3,4}$/.test(cvc)) e.cvc = "Use 3–4 digits";
    return e;
  }, [card, paymentMethod]);

  const canGoShippingNext = Object.keys(shippingErrors).length === 0;
  const canGoPaymentNext = Object.keys(cardErrors).length === 0;

  const markTouched = (keys) =>
    setTouched((prev) => ({ ...prev, ...Object.fromEntries(keys.map((k) => [k, true])) }));

  const placeOrder = () => {
    // In a real app: call backend API here.
    // For demo: simulate success.
    alert("Order placed successfully. Thank you!");
    setItems([]);
    setCheckoutOpen(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <div style={styles.h1}>Shopping Cart</div>
            <div style={styles.subtle}>
              Review items, adjust quantities, then proceed to checkout.
            </div>
          </div>

          <button
            style={styles.secondaryBtn}
            onClick={() => {
              if (typeof onContinueShopping === "function") onContinueShopping();
              else alert("Continue browsing clicked (hook this to your routing).");
            }}
          >
            Continue browsing
          </button>
        </div>

        <div style={styles.grid}>
          {/* Items */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>Items</div>

            {isEmpty ? (
              <div style={{ padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>
                  Your cart is empty.
                </div>
                <div style={styles.subtle}>
                  Add items to your cart, then return here to checkout.
                </div>
              </div>
            ) : (
              <div style={{ display: "grid" }}>
                {items.map((it) => (
                  <div key={it.id} style={styles.itemRow}>
                    <img
                      src={it.image}
                      alt={it.name}
                      style={styles.itemImg}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    <div style={{ display: "grid", gap: 6 }}>
                      <div style={{ fontWeight: 800 }}>{it.name}</div>
                      <div style={styles.subtle}>
                        Size: {it.size || "—"} · In stock: {it.stock ?? "—"}
                      </div>
                      <div style={{ fontWeight: 700 }}>{money(it.price)}</div>

                      <div style={styles.qtyRow}>
                        <div style={styles.stepper}>
                          <button
                            style={styles.stepperBtn}
                            onClick={() => updateQty(it.id, it.qty - 1)}
                            aria-label={`Decrease quantity of ${it.name}`}
                          >
                            −
                          </button>

                          <input
                            value={it.qty}
                            onChange={(e) => updateQty(it.id, e.target.value)}
                            inputMode="numeric"
                            style={styles.qtyInput}
                            aria-label={`Quantity of ${it.name}`}
                          />

                          <button
                            style={styles.stepperBtn}
                            onClick={() => updateQty(it.id, it.qty + 1)}
                            aria-label={`Increase quantity of ${it.name}`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          style={styles.linkBtn}
                          onClick={() => removeItem(it.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div style={styles.itemTotal}>{money(it.price * it.qty)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <div style={{ display: "grid", gap: 12 }}>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Order summary</div>

              <div style={{ padding: 16, display: "grid", gap: 10 }}>
                <div style={styles.kv}>
                  <div style={styles.subtle}>Subtotal</div>
                  <div style={{ fontWeight: 800 }}>{money(subtotal)}</div>
                </div>

                <div style={styles.kv}>
                  <div style={styles.subtle}>Shipping</div>
                  <div style={{ fontWeight: 800 }}>
                    {isEmpty ? "—" : "Calculated at checkout"}
                  </div>
                </div>

                <div style={styles.hr} />

                <div style={styles.kv}>
                  <div style={{ fontWeight: 800 }}>Total</div>
                  <div style={{ fontWeight: 900, fontSize: 18 }}>
                    {isEmpty ? money(0) : money(subtotal)}
                  </div>
                </div>

                <button
                  style={{
                    ...styles.primaryBtn,
                    opacity: isEmpty ? 0.5 : 1,
                    cursor: isEmpty ? "not-allowed" : "pointer",
                  }}
                  onClick={openCheckout}
                  disabled={isEmpty}
                >
                  Checkout
                </button>

                <div style={styles.subtle}>
                  Taxes and final shipping fee can be added during checkout.
                </div>
              </div>
            </div>

            <div style={styles.tipCard}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>
                Tip (optional)
              </div>
              <div style={styles.subtle}>
                You can connect this component to your backend (Java) to store cart
                state per user session and create real orders.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout modal */}
      <Modal
        open={checkoutOpen}
        title="Checkout"
        onClose={closeCheckout}
      >
        <div style={{ display: "grid", gap: 14 }}>
          {/* Stepper */}
          <div style={styles.stepperBar}>
            <StepChip n={1} active={step === 1} done={step > 1} label="Shipping" />
            <div style={styles.stepLine} />
            <StepChip n={2} active={step === 2} done={step > 2} label="Payment" />
            <div style={styles.stepLine} />
            <StepChip n={3} active={step === 3} done={false} label="Review" />
          </div>

          {step === 1 ? (
            <div style={{ display: "grid", gap: 12 }}>
              <Field label="Shipping method">
                <RadioRow
                  name="shippingMethod"
                  options={SHIPPING_METHODS}
                  value={shippingMethod}
                  onChange={setShippingMethod}
                />
              </Field>

              <div style={styles.sectionTitle}>Shipping details</div>

              <div style={styles.formGrid}>
                <Field label="Full name">
                  <Input
                    value={shipping.fullName}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, fullName: e.target.value }))
                    }
                    onBlur={() => markTouched(["fullName"])}
                    placeholder="e.g. Ahmad bin Ali"
                  />
                  {touched.fullName && shippingErrors.fullName ? (
                    <ErrorText text={shippingErrors.fullName} />
                  ) : null}
                </Field>

                <Field label="Phone">
                  <Input
                    value={shipping.phone}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, phone: e.target.value }))
                    }
                    onBlur={() => markTouched(["phone"])}
                    placeholder="e.g. 0123456789"
                  />
                  {touched.phone && shippingErrors.phone ? (
                    <ErrorText text={shippingErrors.phone} />
                  ) : null}
                </Field>

                <Field label="Email">
                  <Input
                    value={shipping.email}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, email: e.target.value }))
                    }
                    onBlur={() => markTouched(["email"])}
                    placeholder="e.g. you@example.com"
                  />
                  {touched.email && shippingErrors.email ? (
                    <ErrorText text={shippingErrors.email} />
                  ) : null}
                </Field>

                <Field label="Address line 1">
                  <Input
                    value={shipping.address1}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, address1: e.target.value }))
                    }
                    onBlur={() => markTouched(["address1"])}
                    placeholder="Street / building / unit"
                  />
                  {touched.address1 && shippingErrors.address1 ? (
                    <ErrorText text={shippingErrors.address1} />
                  ) : null}
                </Field>

                <Field label="Address line 2 (optional)">
                  <Input
                    value={shipping.address2}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, address2: e.target.value }))
                    }
                    placeholder="Apartment, floor, etc."
                  />
                </Field>

                <Field label="City">
                  <Input
                    value={shipping.city}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, city: e.target.value }))
                    }
                    onBlur={() => markTouched(["city"])}
                    placeholder="e.g. Georgetown"
                  />
                  {touched.city && shippingErrors.city ? (
                    <ErrorText text={shippingErrors.city} />
                  ) : null}
                </Field>

                <Field label="State">
                  <Input
                    value={shipping.state}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, state: e.target.value }))
                    }
                    onBlur={() => markTouched(["state"])}
                    placeholder="e.g. Pulau Pinang"
                  />
                  {touched.state && shippingErrors.state ? (
                    <ErrorText text={shippingErrors.state} />
                  ) : null}
                </Field>

                <Field label="Postcode">
                  <Input
                    value={shipping.postcode}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, postcode: e.target.value }))
                    }
                    onBlur={() => markTouched(["postcode"])}
                    placeholder="e.g. 10200"
                  />
                  {touched.postcode && shippingErrors.postcode ? (
                    <ErrorText text={shippingErrors.postcode} />
                  ) : null}
                </Field>

                <Field label="Country">
                  <Input
                    value={shipping.country}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, country: e.target.value }))
                    }
                    onBlur={() => markTouched(["country"])}
                    placeholder="Malaysia"
                  />
                  {touched.country && shippingErrors.country ? (
                    <ErrorText text={shippingErrors.country} />
                  ) : null}
                </Field>
              </div>

              <div style={styles.modalFooter}>
                <button style={styles.secondaryBtn} onClick={closeCheckout}>
                  Cancel
                </button>
                <button
                  style={styles.primaryBtn}
                  onClick={() => {
                    markTouched(requiredShippingFields);
                    if (!canGoShippingNext) return;
                    setStep(2);
                  }}
                >
                  Continue to payment
                </button>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div style={{ display: "grid", gap: 12 }}>
              <Field label="Payment method">
                <RadioRow
                  name="paymentMethod"
                  options={PAYMENT_METHODS}
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                />
              </Field>

              {paymentMethod === "card" ? (
                <>
                  <div style={styles.sectionTitle}>Card details</div>

                  <div style={styles.formGrid}>
                    <Field label="Name on card">
                      <Input
                        value={card.cardName}
                        onChange={(e) =>
                          setCard((c) => ({ ...c, cardName: e.target.value }))
                        }
                        onBlur={() => markTouched(["cardName"])}
                        placeholder="e.g. AHMAD ALI"
                      />
                      {touched.cardName && cardErrors.cardName ? (
                        <ErrorText text={cardErrors.cardName} />
                      ) : null}
                    </Field>

                    <Field label="Card number" hint="Digits only; spaces are okay.">
                      <Input
                        value={card.cardNumber}
                        onChange={(e) =>
                          setCard((c) => ({ ...c, cardNumber: e.target.value }))
                        }
                        onBlur={() => markTouched(["cardNumber"])}
                        placeholder="e.g. 4111 1111 1111 1111"
                        inputMode="numeric"
                      />
                      {touched.cardNumber && cardErrors.cardNumber ? (
                        <ErrorText text={cardErrors.cardNumber} />
                      ) : null}
                    </Field>

                    <Field label="Expiry (MM/YY)">
                      <Input
                        value={card.expiry}
                        onChange={(e) =>
                          setCard((c) => ({ ...c, expiry: e.target.value }))
                        }
                        onBlur={() => markTouched(["expiry"])}
                        placeholder="e.g. 08/28"
                      />
                      {touched.expiry && cardErrors.expiry ? (
                        <ErrorText text={cardErrors.expiry} />
                      ) : null}
                    </Field>

                    <Field label="CVC">
                      <Input
                        value={card.cvc}
                        onChange={(e) =>
                          setCard((c) => ({ ...c, cvc: e.target.value }))
                        }
                        onBlur={() => markTouched(["cvc"])}
                        placeholder="e.g. 123"
                        inputMode="numeric"
                      />
                      {touched.cvc && cardErrors.cvc ? (
                        <ErrorText text={cardErrors.cvc} />
                      ) : null}
                    </Field>
                  </div>
                </>
              ) : (
                <div style={styles.tipCard}>
                  <div style={{ fontWeight: 800, marginBottom: 6 }}>
                    {paymentMethod === "fpx" ? "FPX / Online Banking" : "Cash on Delivery"}
                  </div>
                  <div style={styles.subtle}>
                    This is a demo UI. For real payments, you would redirect to a payment
                    gateway or confirm COD eligibility.
                  </div>
                </div>
              )}

              <div style={styles.modalFooter}>
                <button style={styles.secondaryBtn} onClick={() => setStep(1)}>
                  Back
                </button>
                <button
                  style={styles.primaryBtn}
                  onClick={() => {
                    // validate card fields only when card is selected
                    if (paymentMethod === "card") {
                      markTouched(["cardName", "cardNumber", "expiry", "cvc"]);
                      if (!canGoPaymentNext) return;
                    }
                    setStep(3);
                  }}
                >
                  Review order
                </button>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div style={{ display: "grid", gap: 14 }}>
              <div style={styles.sectionTitle}>Review</div>

              <div style={styles.reviewBox}>
                <div style={{ fontWeight: 900, marginBottom: 8 }}>
                  Shipping to
                </div>
                <div style={styles.subtle}>
                  {shipping.fullName}
                  <br />
                  {shipping.phone} · {shipping.email}
                  <br />
                  {shipping.address1}
                  {shipping.address2 ? <>, {shipping.address2}</> : null}
                  <br />
                  {shipping.postcode} {shipping.city}, {shipping.state}
                  <br />
                  {shipping.country}
                </div>

                <div style={{ ...styles.hr, margin: "14px 0" }} />

                <div style={{ fontWeight: 900, marginBottom: 8 }}>
                  Delivery & payment
                </div>
                <div style={styles.subtle}>
                  {SHIPPING_METHODS.find((m) => m.id === shippingMethod)?.label} (
                  {money(shippingFee)})
                  <br />
                  {PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.label}
                </div>
              </div>

              <div style={styles.reviewBox}>
                <div style={{ fontWeight: 900, marginBottom: 10 }}>
                  Order summary
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                  {items.map((it) => (
                    <div key={it.id} style={styles.kv}>
                      <div style={styles.subtle}>
                        {it.name} × {it.qty}
                      </div>
                      <div style={{ fontWeight: 800 }}>
                        {money(it.price * it.qty)}
                      </div>
                    </div>
                  ))}

                  <div style={styles.hr} />

                  <div style={styles.kv}>
                    <div style={styles.subtle}>Subtotal</div>
                    <div style={{ fontWeight: 800 }}>{money(subtotal)}</div>
                  </div>

                  <div style={styles.kv}>
                    <div style={styles.subtle}>Shipping</div>
                    <div style={{ fontWeight: 800 }}>{money(shippingFee)}</div>
                  </div>

                  <div style={styles.kv}>
                    <div style={{ fontWeight: 900 }}>Total</div>
                    <div style={{ fontWeight: 900, fontSize: 18 }}>
                      {money(total)}
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.modalFooter}>
                <button style={styles.secondaryBtn} onClick={() => setStep(2)}>
                  Back
                </button>
                <button style={styles.primaryBtn} onClick={placeOrder}>
                  Place order
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}

function StepChip({ n, active, done, label }) {
  const bg = done ? "#111827" : active ? "#111827" : "#f3f4f6";
  const fg = done || active ? "#ffffff" : "#111827";
  const bd = done || active ? "#111827" : "#e5e7eb";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 999,
          background: bg,
          color: fg,
          display: "grid",
          placeItems: "center",
          fontWeight: 900,
          border: `1px solid ${bd}`,
          fontSize: 13,
        }}
      >
        {done ? "✓" : n}
      </div>
      <div style={{ fontWeight: 800, fontSize: 13 }}>{label}</div>
    </div>
  );
}

function ErrorText({ text }) {
  return <div style={{ fontSize: 12, color: "#b91c1c" }}>{text}</div>;
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f6f7fb",
    color: "#111827",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
  },
  container: {
    maxWidth: 1080,
    margin: "0 auto",
    padding: "28px 16px 60px",
  },
  header: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  h1: { fontSize: 28, fontWeight: 950, letterSpacing: -0.4 },
  subtle: { color: "#6b7280", fontSize: 13, lineHeight: 1.4 },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr",
    gap: 12,
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 6px 20px rgba(17,24,39,0.06)",
  },
  cardTitle: {
    padding: 16,
    fontWeight: 900,
    borderBottom: "1px solid #eef0f4",
  },
  itemRow: {
    display: "grid",
    gridTemplateColumns: "84px 1fr auto",
    gap: 12,
    padding: 16,
    borderBottom: "1px solid #eef0f4",
    alignItems: "center",
  },
  itemImg: {
    width: 84,
    height: 84,
    borderRadius: 12,
    objectFit: "cover",
    border: "1px solid #eef0f4",
    background: "#f3f4f6",
  },
  itemTotal: {
    fontWeight: 900,
    fontSize: 14,
    whiteSpace: "nowrap",
    paddingLeft: 6,
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
    flexWrap: "wrap",
  },
  stepper: {
    display: "inline-grid",
    gridTemplateColumns: "34px 46px 34px",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    overflow: "hidden",
    background: "#ffffff",
  },
  stepperBtn: {
    border: "none",
    background: "#ffffff",
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 16,
    height: 36,
    color: "#111827", 
  },
  qtyInput: {
    width: 46,
    border: "none",
    textAlign: "center",
    fontWeight: 800,
    outline: "none",
    height: 36,
  },
  kv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  hr: { height: 1, background: "#eef0f4" },
  primaryBtn: {
    background: "#0f172a",
    color: "#ffffff",
    border: "1px solid #0f172a",
    padding: "12px 14px",
    borderRadius: 12,
    fontWeight: 900,
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "#ffffff",
    color: "#0f172a",
    border: "1px solid #d1d5db",
    padding: "10px 14px",
    borderRadius: 12,
    fontWeight: 800,
    cursor: "pointer",
  },
  linkBtn: {
    background: "transparent",
    border: "none",
    color: "#374151",
    textDecoration: "underline",
    cursor: "pointer",
    fontWeight: 700,
    padding: 0,
  },
  tipCard: {
    background: "#ffffff",
    border: "1px dashed #cbd5e1",
    borderRadius: 16,
    padding: 16,
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(17,24,39,0.55)",
    display: "grid",
    placeItems: "center",
    padding: 14,
    zIndex: 50,
  },
  modalCard: {
    width: "min(860px, 100%)",
    maxHeight: "90vh",
    overflow: "auto",
    background: "#ffffff",
    borderRadius: 18,
    border: "1px solid #e5e7eb",
    boxShadow: "0 24px 60px rgba(17,24,39,0.35)",
  },
  modalHeader: {
    padding: "14px 16px",
    borderBottom: "1px solid #eef0f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    position: "sticky",
    top: 0,
    background: "#ffffff",
    zIndex: 1,
  },
  iconBtn: {
  width: 40,
  height: 40,
  borderRadius: 12,
  border: "1px solid #cbd5e1",
  background: "#f8fafc",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
  padding: 0,
},

  stepperBar: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto 1fr auto",
    alignItems: "center",
    gap: 10,
  },
  stepLine: {
    height: 1,
    background: "#e5e7eb",
  },
  sectionTitle: {
    fontWeight: 900,
    fontSize: 14,
    marginTop: 4,
  },
  formGrid: {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: 12,
  rowGap: 18,
  alignItems: "start",
},

  input: {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: 14,

  boxSizing: "border-box",   // ✅ important
  height: 44,                // ✅ consistent height
  lineHeight: "20px",        // ✅ prevents text/hint collisions
  background: "#ffffff",     // ✅ avoids dark global styles
  color: "#111827",          // ✅ readable text
  display: "block",          // ✅ avoids baseline weirdness in grid
},

  radioRow: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    padding: 12,
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    background: "#ffffff",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    paddingTop: 4,
  },
  reviewBox: {
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 14,
    background: "#ffffff",
  },
};

// Small responsive tweak (optional)
if (typeof window !== "undefined") {
  const mq = window.matchMedia("(max-width: 860px)");
  const apply = () => {
    // convert 2-col grid to 1-col on smaller screens
    // (Only affects inline styles defined above by mutating them)
    styles.grid.gridTemplateColumns = mq.matches ? "1fr" : "1.6fr 1fr";
    styles.formGrid.gridTemplateColumns = mq.matches ? "1fr" : "1fr 1fr";
  };
  apply();
  mq.addEventListener?.("change", apply);
}