import { Link } from "react-router-dom";
import MegaMenu from "./MegaMenu";
import SearchWithin from "./SearchWithin";
import { useStore } from "../../app/store";

export default function Header() {
  const { selectors, dispatch, state } = useStore();

  return (
    <header className="header">
      <div className="headerRow">
        <Link to="/" className="logo">ThriftStore</Link>

        <nav className="navGroup" aria-label="Primary">
          <MegaMenu />
          <Link className="navLink" to="/shop?sort=new">New In</Link>
          <Link className="navLink" to="/trade-in">Trade-in</Link>
        </nav>

        <SearchWithin />

        <div className="headerRight">
          <Link className="iconBtn" to="/account/login" title="Login">Login</Link>
          <Link className="iconBtn" to="/wishlist" title="Wishlist">Wishlist</Link>
          <button className="iconBtn" onClick={() => dispatch({ type: "UI_CART_OPEN" })} title="Cart">
            Cart{selectors.cartCount > 0 && <span className="badge">{selectors.cartCount}</span>}
          </button>
        </div>
      </div>

      {state.ui.error ? (
        <div style={{ borderTop: "1px solid var(--border)", padding: "8px 16px", color: "var(--danger)", fontSize: "0.92rem" }}>
          {state.ui.error}
        </div>
      ) : null}
    </header>
  );
}
