import { useStore } from "../../app/store";

export default function Profile() {
  const { state } = useStore();

  return (
    <div className="note">
      <div style={{ fontWeight: 900, marginBottom: 10 }}>Profile (demo UI)</div>

      <div className="muted small" style={{ lineHeight: 1.9 }}>
        Name: <strong>{state.auth.user.name}</strong><br />
        Email: <strong>{state.auth.user.email || "—"}</strong><br />
        Role: <strong>{state.auth.role}</strong><br />
        Status: <strong>{state.auth.isLoggedIn ? "Logged in" : "Guest"}</strong>
      </div>
    </div>
  );
}
