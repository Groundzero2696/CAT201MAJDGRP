import { useEffect, useState } from "react";
import { api } from "../api/client";

const steps = [
  { key: "SUBMITTED", label: "Submitted" },
  { key: "REVIEWING", label: "Reviewing" },
  { key: "APPROVED", label: "Approved" },
  { key: "REJECTED", label: "Rejected" },
  { key: "CREDITS_ISSUED", label: "Credits issued" },
];

export default function TradeIn() {
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [created, setCreated] = useState(null);

  const [items, setItems] = useState([]);

  async function refresh() {
    try {
      const d = await api.getTradeIns("demo");
      setItems(d.items || []);
    } catch {
      setItems([]);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <h1 className="collectionTitle">Trade-in</h1>
      <p className="muted" style={{ maxWidth: 860, lineHeight: 1.6 }}>
        This page uses the Java backend for trade-in submission (processing + file I/O).
      </p>

      <section className="section">
        <div className="note">
          <div style={{ fontWeight: 900, marginBottom: 10 }}>How it works</div>
          <ol className="muted small" style={{ lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
            <li>Submit item details (category + notes).</li>
            <li>Backend stores the request and returns a trade-in ID.</li>
            <li>Admin review can be implemented later.</li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="sectionTitle">
          <h2 className="h2">Submit items</h2>
          <span className="muted small">Connected to backend</span>
        </div>

        <form
          className="note"
          onSubmit={async (e) => {
            e.preventDefault();
            const r = await api.submitTradeIn({ category, notes }, "demo");
            setCreated(r);
            setCategory("");
            setNotes("");
            await refresh();
            alert(`Trade-in submitted: ${r.tradeInId}`);
          }}
        >
          <div className="field">
            <div className="label">Category</div>
            <select className="input" required value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="" disabled>Select a category</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="books">Books</option>
              <option value="vinyl">Vinyl</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div className="field">
            <div className="label">Notes</div>
            <textarea className="input" rows="4" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Brand, size, defects, etc." />
          </div>

          <button className="btnPrimary" type="submit">Submit for review</button>
        </form>
      </section>

      <section className="section">
        <div className="sectionTitle">
          <h2 className="h2">Tracking (backend records)</h2>
          <span className="muted small">From data/tradeins.txt</span>
        </div>

        {items.length === 0 ? (
          <div className="note">
            <div style={{ fontWeight: 900, marginBottom: 6 }}>No trade-ins yet</div>
            <div className="muted small">Submit your first trade-in above.</div>
          </div>
        ) : (
          <div className="note">
            {items.map((t) => (
              <div key={t.id} style={{ borderTop: "1px solid var(--border)", paddingTop: 12, marginTop: 12 }}>
                <div className="rowBetween">
                  <div style={{ fontWeight: 900 }}>{t.id}</div>
                  <span className="pill">{t.status}</span>
                </div>
                <div className="muted small" style={{ marginTop: 6 }}>
                  Category: {t.category} · Created: {t.createdAt}
                </div>
                <div className="muted small" style={{ marginTop: 6, lineHeight: 1.6 }}>
                  Notes: {t.notes || "—"}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
