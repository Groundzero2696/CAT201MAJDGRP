import { useNavigate } from "react-router-dom";

export default function Step2Delivery() {
  const nav = useNavigate();

  return (
    <form
      className="note"
      onSubmit={(e) => {
        e.preventDefault();
        nav("/checkout/payment");
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 10 }}>Delivery method</div>

      <label className="checkRow">
        <input type="radio" name="delivery" defaultChecked />
        Standard (1–3 working days)
      </label>

      <label className="checkRow">
        <input type="radio" name="delivery" />
        Express (demo)
      </label>

      <div style={{ marginTop: 14 }}>
        <button className="btnPrimary" type="submit">Continue</button>
      </div>
    </form>
  );
}
