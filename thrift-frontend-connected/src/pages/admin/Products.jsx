export default function AdminProducts() {
  return (
    <div className="note">
      <div className="rowBetween">
        <div style={{ fontWeight: 900 }}>Products (demo UI)</div>
        <button className="btnPrimary" onClick={() => alert("Demo UI only")}>Add product</button>
      </div>
      <div className="muted small" style={{ marginTop: 10 }}>
        This page is UI-only. Product API is implemented in the Java backend under /api/products.
      </div>
    </div>
  );
}
