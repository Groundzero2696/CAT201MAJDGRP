import { useNavigate } from "react-router-dom";

export default function Step3Payment() {
  const nav = useNavigate();

  return (
    <form
      className="note"
      onSubmit={(e) => {
        e.preventDefault();
        nav("/checkout/confirm");
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 10 }}>Payment</div>

      <label className="checkRow">
        <input type="radio" name="pay" defaultChecked />
        Cash on Delivery (demo)
      </label>

      <label className="checkRow">
        <input type="radio" name="pay" />
        Simulated card payment (demo)
      </label>

      <div style={{ marginTop: 14 }}>
        <button className="btnPrimary" type="submit">Continue</button>
      </div>
    </form>
  );
}
