import { useEffect, useState } from "react";
import { api } from "../../api/client";

export default function Orders() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getOrders("demo")
      .then((d) => setItems(d.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="note">
      <div style={{ fontWeight: 900, marginBottom: 10 }}>Orders (from Java backend)</div>

      {loading ? (
        <div className="muted small">Loading…</div>
      ) : items.length === 0 ? (
        <div className="muted small">No orders yet. Place an order at checkout to create one.</div>
      ) : (
        items.map((o) => (
          <div key={o.id} style={{ borderTop: "1px solid var(--border)", paddingTop: 12, marginTop: 12 }}>
            <div className="rowBetween">
              <div style={{ fontWeight: 900 }}>{o.id}</div>
              <span className="pill">Total RM{Number(o.total).toFixed(2)}</span>
            </div>
            <div className="muted small" style={{ marginTop: 6 }}>
              Created: {o.createdAt}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
