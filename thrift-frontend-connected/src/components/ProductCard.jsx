import { Link } from "react-router-dom";
import { useStore } from "../app/store";

export default function ProductCard({ p }) {
  const { state, dispatch, actions } = useStore();
  const wished = state.wishlist.ids.includes(p.id);

  const img = `https://picsum.photos/seed/${encodeURIComponent(p.id)}/800/1000`;

  return (
    <div className="card">
      <div className="cardImg">
        <img src={img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <button
          className={`heartBtn ${wished ? "active" : ""}`}
          onClick={() => dispatch({ type: "WISHLIST_TOGGLE", id: p.id })}
          aria-label="Toggle wishlist"
          title="Wishlist"
        >
          {wished ? "♥" : "♡"}
        </button>
      </div>

      <div className="cardBody">
        <div className="rowBetween">
          <div style={{ fontWeight: 800, lineHeight: 1.2 }}>
            <Link to={`/product/${p.id}`}>{p.title}</Link>
          </div>
          <div className="price">RM{Number(p.price).toFixed(2)}</div>
        </div>

        <div className="muted small">{p.brand}</div>

        <div className="rowBetween">
          <span className="pill">Condition: {p.condition}</span>
          <span className="pill">{p.inStock ? "In stock" : "Out of stock"}</span>
        </div>

        <div className="rowBetween">
          <button
            className="btnGhost"
            disabled={!p.inStock}
            onClick={() => actions.addToCart({ id: p.id, title: p.title, price: Number(p.price) })}
          >
            Add to cart
          </button>
          <button className="btnGhost" type="button" onClick={() => actions.addToCart({ id: p.id, title: p.title, price: Number(p.price) })}>
            Quick add
          </button>
        </div>
      </div>
    </div>
  );
}
