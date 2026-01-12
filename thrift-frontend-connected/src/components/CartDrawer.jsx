import { useStore } from "../app/store";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const { state, dispatch, selectors, actions } = useStore();

  return (
    <div
      className={`drawerOverlay ${state.ui.cartOpen ? "open" : ""}`}
      onClick={() => dispatch({ type: "UI_CART_CLOSE" })}
    >
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawerHeader">
          <h3>Cart</h3>
          <button onClick={() => dispatch({ type: "UI_CART_CLOSE" })}>✕</button>
        </div>

        {state.cart.items.length === 0 ? (
          <div className="emptyState">
            <p>Your cart is empty.</p>
            <p className="muted">Try these popular collections:</p>
            <div className="chipRow">
              <Link to="/shop/vinyl" className="chip">Shop Vinyl</Link>
              <Link to="/shop/books" className="chip">Books</Link>
              <Link to="/trade-in" className="chip">Trade-in</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="drawerBody">
              {state.cart.items.map((item) => (
                <div key={item.id} className="cartRow">
                  <img
                    src={`https://picsum.photos/seed/${encodeURIComponent(item.id)}/200/260`}
                    alt={item.title}
                    className="cartThumb"
                  />
                  <div className="cartInfo">
                    <div className="cartTitle">{item.title}</div>
                    <div className="muted">RM{Number(item.price).toFixed(2)}</div>
                    <div className="qty">
                      <button onClick={() => actions.setCartQty(item.id, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => actions.setCartQty(item.id, item.qty + 1)}>+</button>
                      <button className="linkDanger" onClick={() => actions.removeFromCart(item.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="drawerFooter">
              <div className="rowBetween">
                <span>Subtotal</span>
                <strong>RM{Number(state.cart.subtotal).toFixed(2)}</strong>
              </div>
              <div className="muted small">
                {selectors.remaining > 0
                  ? `RM${selectors.remaining.toFixed(2)} to free shipping`
                  : "Free shipping unlocked"}
              </div>
              <Link to="/checkout" className="btnPrimary" onClick={() => dispatch({ type: "UI_CART_CLOSE" })}>
                Checkout
              </Link>
              <Link to="/cart" className="btnGhost" onClick={() => dispatch({ type: "UI_CART_CLOSE" })}>
                View cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
