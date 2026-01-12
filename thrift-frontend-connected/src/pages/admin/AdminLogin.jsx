import { useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../../app/store";

export default function AdminLogin() {
  const { dispatch } = useStore();
  const nav = useNavigate();
  const loc = useLocation();
  const redirectTo = loc.state?.from || "/admin";

  return (
    <form
      className="note"
      style={{ width: "min(520px, calc(100% - 32px))", margin: "24px auto" }}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "AUTH_LOGIN_ADMIN", user: { name: "Admin", email: "admin@demo.com" } });
        nav(redirectTo);
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 10 }}>Admin Login (demo UI)</div>
      <div className="muted small" style={{ marginBottom: 10 }}>
        This is a UI-only admin login. Promo updates are real (Java backend).
      </div>

      <div className="field">
        <div className="label">Email</div>
        <input className="input" type="email" required placeholder="admin@demo.com" />
      </div>

      <div className="field">
        <div className="label">Password</div>
        <input className="input" type="password" required placeholder="••••••••" />
      </div>

      <button className="btnPrimary" type="submit">Login</button>
    </form>
  );
}
