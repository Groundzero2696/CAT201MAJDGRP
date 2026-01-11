// ===== NAVIGATION FUNCTIONS =====
function goHome() {
  window.location.href = "indexHP.html";
}

function goToWishlist() {
  window.location.href = "wishlist.html";
}

// ===== GET PRODUCT ID =====
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const product = data.find(p => p.id == productId);

// ===== MAIN COMPONENT =====
function App() {
  if (!product) {
    return <h2 style={{ padding: "40px" }}>Product not found</h2>;
  }

  return (
    <div className="container">
      <div className="image-box">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="details">
        <h1>{product.name}</h1>

        <p className="new-price">${product.price}</p>

        <button
          className="add-cart"
          onClick={() => console.log("Add to cart:", product.id)}
        >
          ADD TO CART
        </button>

        <div style={{ marginTop: "15px" }}>
          <button
            onClick={goToWishlist}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "18px"
            }}
          >
            <i className="fa-regular fa-heart"></i> Add to Wishlist
          </button>
        </div>

        <div className="description">
          <h3>Description</h3>
          <p>{product.description || "No description available."}</p>
        </div>
      </div>
    </div>
  );
}

// ===== RENDER =====
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
