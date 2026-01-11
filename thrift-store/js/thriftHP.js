// ===== NAVIGATION FUNCTIONS =====
function goHome() {
  window.location.href = "indexHP.html";
}

function goToListing(category) {
  window.location.href = "listing.html?category=" + category;
}

function goToProduct(id) {
  window.location.href = "product.html?id=" + id;
}

function goToWishlist() {
  window.location.href = "wishlist.html";
}

// ===== MAIN COMPONENT =====
function App() {
  return (
    <div>
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="top-row">
          <div
            className="logo"
            onClick={goHome}
            style={{ cursor: "pointer" }}
          >
            Thrifters4ever
          
          </div>

          <div className="search-wrapper">
            <input type="text" placeholder="Search for items..." />
          </div>

          <div className="icon-group">
            <div className="icon-item">
              <i className="fa-regular fa-user"></i>
              <span>Account</span>
            </div>

            <div
              className="icon-item"
              onClick={goToWishlist}
              style={{ cursor: "pointer" }}
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

        {/* ===== CATEGORY BAR ===== */}
        <div className="category-bar">
          <span onClick={() => goToListing("men")}>Men</span>
          <span onClick={() => goToListing("women")}>Women</span>
          <span onClick={() => goToListing("vintage")}>Vintage</span>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero">
        <h1>Thrift Better. Live Better.</h1>
        <p>Discover unique second-hand fashion</p>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="section">
        <h2>Featured Products</h2>

        <div className="product-grid">
          {data.slice(0, 4).map(product => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => goToProduct(product.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-img"
                />

                <div
                  className="wishlist-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToWishlist();
                  }}
                >
                  <i className="fa-regular fa-heart"></i>
                </div>
              </div>

              <h4>{product.name}</h4>
              <p className="price">${product.price}</p>

              <button
                className="cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Add to cart:", product.id);
                }}
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <p>© 2026 ThriftStore. All rights reserved.</p>
      </footer>
    </div>
  );
}

// ===== RENDER =====
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
