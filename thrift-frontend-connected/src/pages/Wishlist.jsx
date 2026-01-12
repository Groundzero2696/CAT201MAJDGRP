import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "../app/store";
import ProductCard from "../components/ProductCard";
import { api } from "../api/client";

export default function Wishlist() {
  const { state } = useStore();
  const [all, setAll] = useState([]);

  useEffect(() => {
    api.getProducts().then((d) => setAll(d.items || [])).catch(() => setAll([]));
  }, []);

  const list = all.filter((p) => state.wishlist.ids.includes(p.id));

  return (
    <>
      <h1 className="collectionTitle">Wishlist</h1>
      <p className="muted">Saved items for later.</p>

      {list.length === 0 ? (
        <div className="note">
          <div style={{ fontWeight: 900, marginBottom: 6 }}>No saved items</div>
          <div className="muted small">Browse the shop and tap the heart icon to save products.</div>
          <div style={{ marginTop: 12 }}>
            <Link to="/shop" className="btnPrimary">Shop now</Link>
          </div>
        </div>
      ) : (
        <div className="productGrid">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </>
  );
}
