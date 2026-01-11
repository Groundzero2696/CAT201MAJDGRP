// ===== NAVIGATION FUNCTIONS =====
function goHome() {
  window.location.href = "indexHP.html";
}

function goToProduct(id) {
  window.location.href = "product.html?id=" + id;
}

function goToWishlist() {
  window.location.href = "wishlist.html";
}

// ===== GET CATEGORY FROM URL =====
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// ===== MAIN COMPONENT =====
function App() {
  const filteredProducts = category
    ? data.filter(p => p.category === category)
    : data;

  return (
    <div className="container">
      {/* HEADER */}
      <h1 className="category-title">
        {category ? category.toUpperCase() : "All Products"}
      </h1>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => goToProduct(product.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="image-wrapper">
              <img src={product.image} alt={product.name} />

              <div className="icon-overlay">
                <button
                  className="icon-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToWishlist();
                  }}
                >
                  <i className="fa-regular fa-heart"></i>
                </button>

                <button
                  className="icon-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Add to cart:", product.id);
                  }}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            </div>

            <h4>{product.name}</h4>
            <p className="price">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== RENDER =====
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
