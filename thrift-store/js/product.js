// ===== NAVIGATION FUNCTIONS =====
function goHome() {
  window.location.href = "indexHP.html";
}

function goToWishlist() {
  window.location.href = "wishlist.html";
}

function goToCheckout() {
  window.location.href = "checkout.html";
}

// ===== GET PRODUCT ID =====
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const product = data.find(p => p.id == productId);

// ===== MAIN COMPONENT =====
function App() {
  const [quantity, setQuantity] = React.useState(1);

  if (!product) {
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        <h2>Product not found</h2>
        <button 
          onClick={goHome}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            background: "#0a7a3f",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const categoryNames = {
    'accessories': 'Accessories',
    'books': 'Books',
    'clothes': 'Clothes',
    'toys': 'Toys'
  };

  return (
    <div className="container">
      <div className="image-box">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="details">
        <div className="breadcrumb">
          <a href="indexHP.html">Home</a> / {categoryNames[product.category]} / {product.name}
        </div>

        <h1>{product.name}</h1>

        <div className="rating">
          <span className="stars">★★★★★</span>
          <span className="rating-text">(4.8 out of 5)</span>
        </div>

        <div className="price-section">
          <p className="new-price">
            RM {product.price}
            <span className="savings">Great Deal!</span>
          </p>
        </div>

        <div className="quantity-section">
          <label>Quantity:</label>
          <div className="quantity">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              −
            </button>
            <span>{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="button-group">
          <button
            className="add-cart"
            onClick={() => {
              console.log("Add to cart:", product.id, "Quantity:", quantity);
              goToCheckout();
            }}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            ADD TO CART
          </button>

          <button
            className="wishlist-btn"
            onClick={goToWishlist}
          >
            <i className="fa-regular fa-heart"></i>
            Wishlist
          </button>
        </div>

        <div className="product-info">
          <div className="info-item">
            <h3>Description</h3>
            <p>{product.description || "This is a quality preloved item in excellent condition. Perfect for those who appreciate sustainable shopping and unique finds."}</p>
          </div>

          <div className="info-item">
            <h3>Product Details</h3>
            <ul>
              <li>Preloved item in great condition</li>
              <li>Sustainable and eco-friendly choice</li>
              <li>Carefully inspected for quality</li>
              <li>Authentic and unique piece</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== RENDER =====
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);