import { Outlet, NavLink } from "react-router-dom";
import { useStore } from "../../app/store";

function Tab({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `pill ${isActive ? "activePill" : ""}`}
      style={({ isActive }) => ({
        background: isActive ? "var(--brand)" : "var(--surface)",
        color: isActive ? "#fff" : "var(--muted)",
        borderColor: isActive ? "var(--brand)" : "var(--border)",
        fontWeight: isActive ? 900 : 600,
      })}
    >
      {label}
    </NavLink>
  );
}

export default function AccountLayout() {
  const { state, dispatch } = useStore();

  return (
    <>
      <div className="rowBetween" style={{ marginBottom: 10 }}>
        <h1 className="collectionTitle">Account</h1>
        {state.auth.isLoggedIn ? (
          <button className="btnGhost" onClick={() => dispatch({ type: "AUTH_LOGOUT" })}>
            Logout
          </button>
        ) : (
          <span className="muted small">Not logged in</span>
        )}
      </div>

      <div className="note" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        <Tab to="/account/orders" label="Orders" />
        <Tab to="/account/addresses" label="Addresses" />
        <Tab to="/account/wallet" label="Credits Wallet" />
        <Tab to="/account/profile" label="Profile" />
        <Tab to="/account/login" label="Login" />
        <Tab to="/account/register" label="Register" />
      </div>

      <Outlet />
    </>
  );
}
