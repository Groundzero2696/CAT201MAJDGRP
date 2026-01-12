import { useEffect, useState } from "react";
import { useStore } from "../../app/store";

export default function AdminPromotions() {
  const { state, actions } = useStore();
  const [announcement, setAnnouncement] = useState(state.promo.announcement);
  const [threshold, setThreshold] = useState(String(state.promo.freeShippingThreshold));

  useEffect(() => {
    setAnnouncement(state.promo.announcement);
    setThreshold(String(state.promo.freeShippingThreshold));
  }, [state.promo.announcement, state.promo.freeShippingThreshold]);

  return (
    <form
      className="note"
      onSubmit={async (e) => {
        e.preventDefault();
        const n = Number(threshold);
        if (Number.isNaN(n) || n < 0) {
          alert("Threshold must be a valid non-negative number.");
          return;
        }
        await actions.adminUpdatePromo(announcement, n);
        alert("Promotion updated (Java backend wrote to data/promo.txt).");
      }}
    >
      <div className="rowBetween" style={{ marginBottom: 10 }}>
        <div style={{ fontWeight: 900 }}>Promotions (real backend)</div>
        <button className="btnPrimary" type="submit">Save</button>
      </div>

      <div className="field">
        <div className="label">Announcement bar text</div>
        <input className="input" value={announcement} onChange={(e) => setAnnouncement(e.target.value)} />
      </div>

      <div className="field">
        <div className="label">Free shipping threshold (RM)</div>
        <input className="input" type="number" value={threshold} onChange={(e) => setThreshold(e.target.value)} />
      </div>

      <div className="muted small" style={{ marginTop: 10, lineHeight: 1.8 }}>
        This updates the Java backend file: <strong>thrift-backend-java/data/promo.txt</strong>.
      </div>
    </form>
  );
}
