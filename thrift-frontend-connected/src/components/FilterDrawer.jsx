export default function FilterDrawer({ open, onClose, children }) {
  return (
    <div className={`drawerOverlay ${open ? "open" : ""}`} onClick={onClose}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()} style={{ width: "min(420px, 100%)" }}>
        <div className="drawerHeader">
          <h3>Filters</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="drawerBody">{children}</div>
      </aside>
    </div>
  );
}
