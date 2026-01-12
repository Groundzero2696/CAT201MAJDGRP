import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../app/store";

export default function Step4Confirm() {
  const { state, actions } = useStore();
  const [placed, setPlaced] = useState(false);
  const [result, setResult] = useState(null);

  async function placeOrder() {
    const r = await actions.checkout();
    setResult(r);
    setPlaced(true);
  }

  return (
    <div className="note">
      <div style={{ fontWeight: 900, marginBottom: 10 }}>Confirm & Place Order</div>

      {!placed ? (
        <>
          <div className="muted small" style={{ lineHeight: 1.8 }}>
            Subtotal: <strong>RM{Number(state.cart.subtotal).toFixed(2)}</strong><br />
            Click “Place order” to let the Java backend create an order (processing + file I/O).
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btnPrimary" onClick={placeOrder}>Place order</button>
            <Link to="/cart" className="btnGhost">Back to cart</Link>
          </div>
        </>
      ) : (
        <>
          <div className="muted small" style={{ lineHeight: 1.8 }}>
            Order created by Java backend.<br />
            Order number: <strong>{result?.orderId}</strong><br />
            Total: <strong>RM{Number(result?.total || 0).toFixed(2)}</strong>
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link to="/shop" className="btnPrimary">Continue shopping</Link>
            <Link to="/account/orders" className="btnGhost">View orders</Link>
          </div>
        </>
      )}
    </div>
  );
}
