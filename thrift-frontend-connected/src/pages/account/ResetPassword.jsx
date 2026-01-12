export default function ResetPassword() {
  return (
    <form
      className="note"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Demo: reset link sent.");
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 10 }}>Reset password (demo)</div>
      <div className="field">
        <div className="label">Email</div>
        <input className="input" type="email" required placeholder="you@email.com" />
      </div>
      <button className="btnPrimary" type="submit">Send reset link</button>
    </form>
  );
}
