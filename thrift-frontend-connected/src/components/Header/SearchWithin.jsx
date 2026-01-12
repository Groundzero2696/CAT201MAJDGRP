import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORY_TREE } from "../../mock/categories";

export default function SearchWithin() {
  const scopes = useMemo(() => ["all", ...CATEGORY_TREE.map((c) => c.key)], []);
  const [active, setActive] = useState("all");
  const [q, setQ] = useState("");
  const nav = useNavigate();

  return (
    <div className="searchWithin">
      <div className="searchBox">
        <div className="tabs" role="tablist" aria-label="Search within">
          {scopes.map((s) => (
            <button
              key={s}
              type="button"
              className={`tab ${active === s ? "active" : ""}`}
              onClick={() => setActive(s)}
            >
              {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        <form
          className="searchRow"
          onSubmit={(e) => {
            e.preventDefault();
            const base = active === "all" ? "/shop" : `/shop/${active}`;
            const query = q.trim() ? `?q=${encodeURIComponent(q.trim())}` : "";
            nav(`${base}${query}`);
          }}
        >
          <input
            className="searchInput"
            placeholder="Search products…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="btnPrimary" type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}
