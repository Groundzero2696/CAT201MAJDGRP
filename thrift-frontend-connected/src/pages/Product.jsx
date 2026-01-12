import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductCard from "../components/ProductCard";
import { useStore } from "../app/store";
import { api } from "../api/client";

export default function Product() {
  const { id } = useParams();
  const { state, dispatch, actions } = useStore();

  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState("description");

  useEffect(() => {
    setLoading(true);
    api.getProductById(id)
      .then((prod) => setP(prod))
      .catch(() => setP(null))
      .finally(() => setLoading(false));
  }, [id]);

  const wished = p ? state.wishlist.ids.includes(p.id) : false;

  const images = useMemo(() => {
    const seed = encodeURIComponent(id);
    return [
      `https://picsum.photos/seed/${seed}-1/1200/900`,
      `https://picsum.photos/seed/${seed}-2/1200/900`,
      `https://picsum.photos/seed/${seed}-3/1200/900`,
    ];
  }, [id]);

  if (loading) {
    return (
      <div className="note">
        <div style={{ fontWeight: 900, marginBottom: 6 }}>Loading product</div>
        <div className="muted small">Fetching product from Java backend…</div>
      </div>
    );
  }

  if (!p) {
    return (
      <div className="note">
        <div style={{ fontWeight: 900, marginBottom: 6 }}>Product not found</div>
        <Link className="btnGhost" to="/shop">Back to shop</Link>
      </div>
    );
  }

  const crumbs = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: p.category, to: `/shop/${p.category}` },
    { label: p.subcategory, to: `/shop/${p.category}/${p.subcategory}` },
    { label: p.title },
  ];

  const shippingSnippet = "Delivery 1–3 working days (demo). Returns accepted within 7 days for eligible items.";

  return (
    <>
      <Breadcrumbs items={crumbs} />

      <div className="productLayout">
        <div className="gallery">
          <div className="galleryMain">
            <img
              src={images[activeImg]}
              alt={p.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div className="thumbRow" aria-label="Product images">
            {images.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt={`${p.title} ${idx + 1}`}
                className={`thumb ${idx === activeImg ? "active" : ""}`}
                onClick={() => setActiveImg(idx)}
              />
            ))}
          </div>
        </div>

        <aside className="productInfo">
          <h1 className="productName">{p.title}</h1>
          <div className="muted small" style={{ marginBottom: 10 }}>{p.brand}</div>

          <div className="rowBetween" style={{ marginBottom: 10 }}>
            <span className="pill">Condition: {p.condition}</span>
            <span className="pill">{p.inStock ? "In stock" : "Out of stock"}</span>
          </div>

          <div className="rowBetween" style={{ marginBottom: 12 }}>
            <div className="price" style={{ fontSize: "1.25rem" }}>RM{Number(p.price).toFixed(2)}</div>
            <span className="pill">{p.category}/{p.subcategory}</span>
          </div>

          <div className="note">
            <div style={{ fontWeight: 900, marginBottom: 6 }}>Shipping & returns</div>
            <div className="muted small">{shippingSnippet}</div>
          </div>

          <div style={{ height: 12 }} />

          <div className="heroActions">
            <button
              className="btnPrimary"
              disabled={!p.inStock}
              onClick={() => actions.addToCart({ id: p.id, title: p.title, price: Number(p.price) })}
            >
              Add to cart
            </button>

            <button
              className="btnGhost"
              onClick={() => dispatch({ type: "WISHLIST_TOGGLE", id: p.id })}
            >
              {wished ? "Saved" : "Save to wishlist"}
            </button>
          </div>

          <div className="tabBar" role="tablist" aria-label="Product tabs">
            {[
              { key: "description", label: "Description" },
              { key: "condition", label: "Condition notes" },
              { key: "delivery", label: "Delivery/returns" },
            ].map((t) => (
              <button
                key={t.key}
                className={`tab2 ${tab === t.key ? "active" : ""}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="tabPanel">
            {tab === "description" && <div>Curated thrift item. Backend returns core attributes; images are placeholders for demo.</div>}
            {tab === "condition" && <div>Condition: {p.condition}. Please refer to photos.</div>}
            {tab === "delivery" && <div>{shippingSnippet}</div>}
          </div>
        </aside>
      </div>

      <section className="section">
        <div className="sectionTitle">
          <h2 className="h2">More to explore</h2>
          <Link className="muted small" to={`/shop/${p.category}`}>More in {p.category}</Link>
        </div>
        <Related category={p.category} currentId={p.id} />
      </section>
    </>
  );
}

function Related({ category, currentId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.getProducts({ category })
      .then((d) => setItems((d.items || []).filter((x) => x.id !== currentId).slice(0, 4)))
      .catch(() => setItems([]));
  }, [category, currentId]);

  return (
    <div className="productGrid">
      {items.map((x) => <ProductCard key={x.id} p={x} />)}
    </div>
  );
}
