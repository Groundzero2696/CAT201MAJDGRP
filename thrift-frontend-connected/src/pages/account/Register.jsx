import { useNavigate } from "react-router-dom";
import { useStore } from "../../app/store";

export default function Register() {
  const { dispatch } = useStore();
  const nav = useNavigate();

  return (
    <form
      className="note"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "AUTH_LOGIN_CUSTOMER", user: { name: "New User", email: "new@user.com" } });
        nav("/account/profile");
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 10 }}>Register (demo)</div>

      <div className="field">
        <div className="label">Full name</div>
        <input className="input" required placeholder="Your name" />
      </div>

      <div className="field">
        <div className="label">Email</div>
        <input className="input" type="email" required placeholder="you@email.com" />
      </div>

      <div className="field">
        <div className="label">Password</div>
        <input className="input" type="password" required placeholder="Create a password" />
      </div>

      <button className="btnPrimary" type="submit">Create account</button>
    </form>
  );
}
