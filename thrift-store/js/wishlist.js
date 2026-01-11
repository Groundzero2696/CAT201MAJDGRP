// ===== NAVIGATION FUNCTIONS =====
function goHome() {
  window.location.href = "indexHP.html";
}

function goToProduct(id) {
  window.location.href = "product.html?id=" + id;
}

// ===== TEMP WISHLIST DATA (FRONTEND ONLY) =====
const wishlistItems = [
  data[0],
  data[2],
  data[5],
  data[9]
];

// ===== MAIN COMPONENT =====
function App() {
  const [wishlist, setWishlist] = React.useState(wishlistItems);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const categoryNames = {
    'accessories': 'Accessories',
    'books': 'Books',
    'clothes': 'Clothes',
    'toys': 'Toys'
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-wrapper">
        <div className="wishlist-header">
          <button className="back-btn" onClick={goHome}>
            <i className="fa-solid fa-arrow-left"></i>
            Back to Home
          </button>
        </div>
        
        <div className="empty-wishlist">
          <i className="fa-regular fa-heart"></i>
          <h2>Your wishlist is empty</h2>
          <p>Start adding items you love to your wishlist!</p>
          <button className="shop-btn" onClick={goHome}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-wrapper">
      {/* HEADER */}
      <div className="wishlist-header">
        <div className="header-content">
          <button className="back-btn" onClick={goHome}>
            <i className="fa-solid fa-arrow-left"></i>
            Back to Home
          </button>
          <h1>My Wishlist</h1>
          <span className="wishlist-stats">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {/* WISHLIST GRID */}
      <div className="wishlist-grid">
        {wishlist.map(item => (
          <div key={item.id} className="wishlist-card">
            <div 
              className="card-image"
              onClick={() => goToProduct(item.id)}
            >
              <img src={item.image} alt={item.name} />
              
              <div 
                className="remove-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(item.id);
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>

            <div className="card-details">
              <div className="item-category">
                {categoryNames[item.category]}
              </div>
              <h3>{item.name}</h3>
              <p className="card-price">RM {item.price}</p>

              <div className="card-actions">
                <button
                  className="add-cart-btn"
                  onClick={() => console.log("Add to cart:", item.id)}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  Add to Cart
                </button>
                
                <button
                  className="view-btn"
                  onClick={() => goToProduct(item.id)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== RENDER =====
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);