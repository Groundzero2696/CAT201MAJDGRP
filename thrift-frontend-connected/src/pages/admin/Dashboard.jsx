import { ADMIN_KPIS } from "../../mock/admin";

export default function Dashboard() {
  const cards = [
    { label: "Orders today", value: ADMIN_KPIS.ordersToday },
    { label: "Items listed", value: ADMIN_KPIS.itemsListed },
    { label: "Low stock", value: ADMIN_KPIS.lowStock },
    { label: "Trade-ins pending", value: ADMIN_KPIS.tradeInsPending },
  ];

  return (
    <>
      <h1 className="collectionTitle">Dashboard</h1>
      <div className="muted small" style={{ marginBottom: 14 }}>KPI overview for admin demo.</div>

      <div className="tiles" style={{ gridTemplateColumns: "repeat(4, minmax(0,1fr))" }}>
        {cards.map((c) => (
          <div className="tile" key={c.label}>
            <div className="tileTitle">{c.label}</div>
            <div style={{ fontWeight: 900, fontSize: "1.6rem" }}>{c.value}</div>
            <div className="tileDesc">Updated (demo)</div>
          </div>
        ))}
      </div>
    </>
  );
}
