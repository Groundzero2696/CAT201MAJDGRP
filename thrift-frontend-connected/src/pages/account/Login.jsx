import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../app/store";

export default function Login() {
  const { dispatch } = useStore();
  const nav = useNavigate();

  return (
    <form
      className="note"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "AUTH_LOGIN_CUSTOMER", user: { name: "Demo User", email: "demo@user.com" } });
        nav("/account/orders");
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 10 }}>Login (demo)</div>

      <div className="field">
        <div className="label">Email</div>
        <input className="input" type="email" required placeholder="you@email.com" />
      </div>

      <div className="field">
        <div className="label">Password</div>
        <input className="input" type="password" required placeholder="••••••••" />
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="btnPrimary" type="submit">Login</button>
        <Link className="btnGhost" to="/account/reset">Reset password</Link>
      </div>
    </form>
  );
}
