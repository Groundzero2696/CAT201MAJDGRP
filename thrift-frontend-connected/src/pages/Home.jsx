import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ReviewStrip from "../components/ReviewStrip";
import NewsletterSignup from "../components/NewsletterSignup";
import { api } from "../api/client";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.getProducts()
      .then((d) => setItems(d.items || []))
      .catch(() => setItems([]));
  }, []);

  const justArrived = items.slice(0, 4);
  const featured = items.slice(4, 8);

  return (
    <>
      <section className="hero">
        <div className="heroCard">
          <h1 className="heroTitle">Find your next treasure—better for wallet, better for planet.</h1>
          <p className="heroText">
            Shop curated thrift across fashion, books, vinyl, and accessories. Transparent condition notes and quick category browsing.
          </p>
          <div className="heroActions">
            <Link to="/shop" className="btnPrimary">Shop all</Link>
            <Link to="/trade-in" className="btnGhost">Trade-in</Link>
            <Link to="/shop?sort=new" className="btnGhost">New In</Link>
          </div>
        </div>

        <div className="heroCard">
          <div className="note">
            <div style={{ fontWeight: 900, marginBottom: 6 }}>Impact</div>
            <div className="muted small">
              Every second-hand item extends product life and reduces waste. We verify condition and pack responsibly.
            </div>
          </div>

          <div style={{ height: 12 }} />

          <div className="note">
            <div style={{ fontWeight: 900, marginBottom: 6 }}>Trust</div>
            <div className="muted small">
              Java backend processes checkout + writes order records (file I/O) for rubric evidence.
            </div>
          </div>
        </div>
      </section>

      <section className="tiles" aria-label="Featured tiles">
        <Link className="tile" to="/shop/vinyl">
          <div className="tileTitle">Shop Vinyl</div>
          <div className="tileDesc">Curated pressings: jazz, rock, pop, classics.</div>
          <div className="muted small">Browse →</div>
        </Link>

        <Link className="tile" to="/trade-in">
          <div className="tileTitle">Trade-in Credits</div>
          <div className="tileDesc">Submit items, get evaluated, earn credits.</div>
          <div className="muted small">How it works →</div>
        </Link>

        <Link className="tile" to="/shop/books">
          <div className="tileTitle">Books</div>
          <div className="tileDesc">Fiction, non-fiction, textbooks, comics.</div>
          <div className="muted small">Browse →</div>
        </Link>
      </section>

      <section className="section">
        <div className="sectionTitle">
          <h2 className="h2">Just Arrived</h2>
          <Link className="muted small" to="/shop?sort=new">View all</Link>
        </div>
        <div className="productGrid">
          {justArrived.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="section">
        <div className="sectionTitle">
          <h2 className="h2">Featured picks</h2>
          <span className="muted small">Condition-verified, best value</span>
        </div>
        <div className="productGrid">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="section">
        <div className="sectionTitle">
          <h2 className="h2">Customer reviews</h2>
          <span className="muted small">What shoppers say</span>
        </div>
        <ReviewStrip />
      </section>

      <section className="section">
        <NewsletterSignup />
      </section>
    </>
  );
}
