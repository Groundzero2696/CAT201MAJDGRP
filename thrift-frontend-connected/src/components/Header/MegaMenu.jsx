import { Link } from "react-router-dom";
import { CATEGORY_TREE } from "../../mock/categories";

export default function MegaMenu() {
  return (
    <div className="megaWrap">
      <span className="navLink" style={{ cursor: "default" }}>Shop ▾</span>

      <div className="megaPanel" role="menu" aria-label="Mega menu">
        <div className="megaCols">
          {CATEGORY_TREE.slice(0, 3).map((cat) => (
            <div className="megaCol" key={cat.key}>
              <div className="megaTitle">{cat.label}</div>

              {cat.children.slice(0, 3).map((sub) => (
                <div key={sub.key}>
                  <Link className="megaItem" to={`/shop/${cat.key}/${sub.key}`}>
                    <span>{sub.label}</span>
                    <span className="muted">→</span>
                  </Link>
                </div>
              ))}

              <div className="megaSub">
                {cat.highlights.map((h) => (
                  <Link key={h} to={`/shop/${cat.key}`} className="navLink" style={{ padding: "6px 10px" }}>
                    {h}
                  </Link>
                ))}
              </div>

              <Link className="btnGhost" to={`/shop/${cat.key}`}>View all {cat.label}</Link>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link to="/shop" className="chip">Highlights</Link>
          <Link to="/shop?sort=new" className="chip">New In</Link>
          <Link to="/trade-in" className="chip">Trade-in</Link>
        </div>
      </div>
    </div>
  );
}
