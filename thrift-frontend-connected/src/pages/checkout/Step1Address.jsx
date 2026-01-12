import { useNavigate } from "react-router-dom";

export default function Step1Address() {
  const nav = useNavigate();

  return (
    <form
      className="note"
      onSubmit={(e) => {
        e.preventDefault();
        nav("/checkout/delivery");
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 10 }}>Customer info & address</div>

      <div className="field">
        <div className="label">Full name</div>
        <input className="input" required placeholder="Name" />
      </div>

      <div className="field">
        <div className="label">Email</div>
        <input className="input" type="email" required placeholder="Email" />
      </div>

      <div className="field">
        <div className="label">Address</div>
        <input className="input" required placeholder="Street, city, postcode" />
      </div>

      <button className="btnPrimary" type="submit">Continue</button>
    </form>
  );
}
