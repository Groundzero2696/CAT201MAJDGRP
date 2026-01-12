import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../../app/store";

function SideLink({ to, label }) {
  return (
    <NavLink
      to={to}
      className="navLink"
      style={({ isActive }) => ({
        display: "block",
        background: isActive ? "var(--surface-2)" : "transparent",
        border: isActive ? "1px solid var(--border)" : "1px solid transparent",
        borderRadius: 12,
        padding: "10px 12px",
        fontWeight: isActive ? 900 : 700,
      })}
    >
      {label}
    </NavLink>
  );
}

export default function AdminLayout() {
  const { state, dispatch } = useStore();
  const nav = useNavigate();

  return (
    <div className="container" style={{ paddingTop: 22 }}>
      <div className="rowBetween" style={{ marginBottom: 14 }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: "1.35rem" }}>Admin</div>
          <div className="muted small">Signed in as: {state.auth.user.name} ({state.auth.role})</div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="btnGhost" onClick={() => nav("/")}>Back to store</button>
          <button className="btnGhost" onClick={() => { dispatch({ type: "AUTH_LOGOUT" }); nav("/admin/login"); }}>
            Logout
          </button>
        </div>
      </div>

      <div className="collectionLayout" style={{ gridTemplateColumns: "260px 1fr" }}>
        <aside className="filterPanel" style={{ top: 16 }}>
          <div style={{ fontWeight: 900, marginBottom: 10 }}>Admin Menu</div>
          <SideLink to="/admin" label="Dashboard" />
          <SideLink to="/admin/products" label="Products" />
          <SideLink to="/admin/categories" label="Categories" />
          <SideLink to="/admin/orders" label="Orders" />
          <SideLink to="/admin/users" label="Users" />
          <SideLink to="/admin/trade-ins" label="Trade-ins" />
          <SideLink to="/admin/promotions" label="Promotions (real)" />
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
