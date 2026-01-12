import { Link } from "react-router-dom";
import { useStore } from "../app/store";

export default function Cart() {
  const { state, selectors, actions } = useStore();

  return (
    <>
      <h1 className="collectionTitle">Cart</h1>

      {state.cart.items.length === 0 ? (
        <div className="note">
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Your cart is empty</div>
          <div className="muted small">Try these collections to get started.</div>
          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link to="/shop" className="btnPrimary">Shop all</Link>
            <Link to="/shop/vinyl" className="btnGhost">Vinyl</Link>
            <Link to="/shop/books" className="btnGhost">Books</Link>
          </div>
        </div>
      ) : (
        <div className="note">
          {state.cart.items.map((item) => (
            <div key={item.id} className="cartRow" style={{ borderBottom: "1px solid var(--border)" }}>
              <img className="cartThumb" src={`https://picsum.photos/seed/${encodeURIComponent(item.id)}/200/260`} alt={item.title} />
              <div className="cartInfo">
                <div className="cartTitle">{item.title}</div>
                <div className="muted small">RM{Number(item.price).toFixed(2)}</div>
                <div className="qty">
                  <button onClick={() => actions.setCartQty(item.id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => actions.setCartQty(item.id, item.qty + 1)}>+</button>
                  <button className="linkDanger" onClick={() => actions.removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 12 }}>
            <div className="rowBetween">
              <span>Subtotal</span>
              <strong>RM{Number(state.cart.subtotal).toFixed(2)}</strong>
            </div>
            <div className="muted small" style={{ marginTop: 8 }}>
              {selectors.remaining > 0
                ? `Add RM${selectors.remaining.toFixed(2)} for free shipping.`
                : "Free shipping unlocked."}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
              <Link to="/checkout" className="btnPrimary">Proceed to checkout</Link>
              <Link to="/shop" className="btnGhost">Continue shopping</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
