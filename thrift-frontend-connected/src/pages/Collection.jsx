import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductCard from "../components/ProductCard";
import FilterDrawer from "../components/FilterDrawer";
import { api } from "../api/client";

function FilterForm({ filters, setFilters }) {
  return (
    <>
      <div className="filterTitle">Filter</div>

      <div className="field">
        <div className="label">Availability</div>
        <label className="checkRow">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilters((f) => ({ ...f, inStockOnly: e.target.checked }))}
          />
          In stock only
        </label>
      </div>

      <div className="field">
        <div className="label">Condition</div>
        {["New & Sealed", "Great", "Good"].map((c) => (
          <label className="checkRow" key={c}>
            <input
              type="checkbox"
              checked={filters.conditions.includes(c)}
              onChange={(e) => {
                setFilters((f) => {
                  const has = f.conditions.includes(c);
                  const conditions = e.target.checked
                    ? (has ? f.conditions : [...f.conditions, c])
                    : f.conditions.filter((x) => x !== c);
                  return { ...f, conditions };
                });
              }}
            />
            {c}
          </label>
        ))}
      </div>

      <div className="field">
        <div className="label">Price range (RM)</div>
        <div className="rangeRow">
          <input
            className="input"
            placeholder="Min"
            type="number"
            value={filters.minPrice}
            onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value }))}
          />
          <input
            className="input"
            placeholder="Max"
            type="number"
            value={filters.maxPrice}
            onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
          />
        </div>
      </div>

      <button
        className="btnGhost"
        type="button"
        onClick={() => setFilters({ inStockOnly: false, conditions: [], minPrice: "", maxPrice: "" })}
      >
        Clear filters
      </button>
    </>
  );
}

export default function Collection() {
  const { category, subcategory } = useParams();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const sort = params.get("sort") || "featured";

  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({
    inStockOnly: false,
    conditions: [],
    minPrice: "",
    maxPrice: "",
  });
  const [filterOpen, setFilterOpen] = useState(false);

  const [items, setItems] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  const title = useMemo(() => {
    if (!category) return "Shop";
    const cat = category.charAt(0).toUpperCase() + category.slice(1);
    if (!subcategory) return cat;
    const sub = subcategory.replace("-", " ");
    return `${cat} / ${sub.charAt(0).toUpperCase() + sub.slice(1)}`;
  }, [category, subcategory]);

  const description =
    "Browse curated thrift items with transparent condition notes. Use filters to narrow by availability, condition, and price.";

  useEffect(() => {
    const run = async () => {
      setLoadingList(true);
      try {
        const resp = await api.getProducts({
          category: category || "",
          subcategory: subcategory || "",
          q: q || "",
          sort: sort || "",
        });
        setItems(resp.items || []);
      } catch {
        setItems([]);
      } finally {
        setLoadingList(false);
      }
    };
    run();
  }, [category, subcategory, q, sort]);

  const filtered = useMemo(() => {
    let list = items;

    if (filters.inStockOnly) list = list.filter((p) => p.inStock);
    if (filters.conditions.length > 0) list = list.filter((p) => filters.conditions.includes(p.condition));

    const min = filters.minPrice === "" ? null : Number(filters.minPrice);
    const max = filters.maxPrice === "" ? null : Number(filters.maxPrice);

    if (min !== null && !Number.isNaN(min)) list = list.filter((p) => Number(p.price) >= min);
    if (max !== null && !Number.isNaN(max)) list = list.filter((p) => Number(p.price) <= max);

    return list;
  }, [items, filters]);

  const crumbs = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
  ];
  if (category) crumbs.push({ label: category, to: `/shop/${category}` });
  if (subcategory) crumbs.push({ label: subcategory, to: `/shop/${category}/${subcategory}` });

  return (
    <>
      <Breadcrumbs items={crumbs} />

      <div className="collectionTop">
        <div>
          <h1 className="collectionTitle">{title}</h1>
          <div className="descBox">
            {expanded ? description : `${description.slice(0, 120)}… `}
            <button className="linkBtn" onClick={() => setExpanded((x) => !x)}>
              {expanded ? "Show less" : "Show more"}
            </button>
          </div>
        </div>

        <div className="toolsRow">
          <button className="btnGhost" type="button" onClick={() => setFilterOpen(true)}>
            Filters
          </button>
          <select
            className="select"
            value={sort}
            onChange={(e) => {
              const next = new URLSearchParams(params);
              next.set("sort", e.target.value);
              setParams(next, { replace: true });
            }}
          >
            <option value="featured">Featured</option>
            <option value="new">Date: New</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
          <span className="muted small">{loadingList ? "Loading…" : `${filtered.length} results`}</span>
        </div>
      </div>

      <div className="collectionLayout">
        <aside className="filterPanel" aria-label="Filters panel">
          <FilterForm filters={filters} setFilters={setFilters} />
        </aside>

        <section aria-label="Product results">
          {loadingList ? (
            <div className="note">
              <div style={{ fontWeight: 900, marginBottom: 6 }}>Loading</div>
              <div className="muted small">Fetching products from Java backend…</div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="note">
              <div style={{ fontWeight: 900, marginBottom: 6 }}>No results</div>
              <div className="muted small">Try clearing filters or using a different keyword.</div>
            </div>
          ) : (
            <div className="productGrid">
              {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          )}
        </section>
      </div>

      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)}>
        <FilterForm filters={filters} setFilters={setFilters} />
      </FilterDrawer>
    </>
  );
}
