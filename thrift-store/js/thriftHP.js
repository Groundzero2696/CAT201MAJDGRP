function Header() {
  return (
    <header className="header">
      <div className="top-row">
        <div
          className="logo"
          onClick={() => window.location.href = "indexHP.html"}
        >
          Thrift
        </div>

        <div className="search-wrapper">
          <input placeholder="Find your next treasure from 40,000+ pre-loved items" />
        </div>

        <div className="icon-group">
          <div className="icon-item">
            <i className="fa-regular fa-user"></i>
            <span>Account</span>
          </div>

          {/* HEADER WISHLIST = NAVIGATION */}
          <div
            className="icon-item"
            onClick={() => window.location.href = "wishlist.html"}
          >
            <i className="fa-regular fa-heart"></i>
            <span>Wishlist</span>
          </div>

          <div className="icon-item">
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Cart</span>
          </div>
        </div>
      </div>

      <div className="category-bar">
        <span onClick={() => window.location.href="listing.html?category=books"}>Books</span>
        <span onClick={() => window.location.href="listing.html?category=men"}>Men's Clothes</span>
        <span onClick={() => window.location.href="listing.html?category=women"}>Women's Clothes</span>
      </div>
    </header>
  );
}

/* ===== ADD TO WISHLIST LOGIC ===== */
function addToWishlist(product, e) {
  e.stopPropagation(); // prevent opening product page

  const existing = JSON.parse(localStorage.getItem("wishlist")) || [];

  const alreadyAdded = existing.find(item => item.id === product.id);
  if (alreadyAdded) return;

  localStorage.setItem(
    "wishlist",
    JSON.stringify([...existing, product])
  );

  alert("Added to wishlist");
}

function App() {
  return (
    <>
      <Header />

      <section className="hero">
        <h1>Discover Pre-Loved Books & Fashion</h1>
        <p>Shop sustainably. Save more.</p>
      </section>

      <section className="section">
        <h2>Best Selling Books</h2>

        <div className="product-grid">
          {data.filter(p => p.category === "books").map(p => (
            <div
              key={p.id}
              className="product-card"
              onClick={() => window.location.href = `product.html?id=${p.id}`}
            >
              <div className="image-wrapper">
                <img src={p.image} className="product-img" />

                {/* PRODUCT HEART = ADD */}
                <div
                  className="wishlist-icon"
                  onClick={(e) => addToWishlist(p, e)}
                >
                  <i className="fa-regular fa-heart"></i>
                </div>
              </div>

              <h4>{p.name}</h4>
              <p className="price">RM{p.price}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
