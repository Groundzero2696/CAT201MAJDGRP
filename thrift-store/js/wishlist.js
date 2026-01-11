// ===== NAVIGATION FUNCTIONS =====
function goHome() {
  window.location.href = "indexHP.html";
}

function goToProduct(id) {
  window.location.href = "product.html?id=" + id;
}

// ===== TEMP WISHLIST DATA (FRONTEND ONLY) =====
const wishlistItems = data.slice(0, 3);

// ===== MAIN COMPONENT =====
function App() {
  return (
    <div className="wishlist-wrapper">
      <h2>My Wishlist</h2>

      <div className="wishlist-container">
        <div className="list-card">
          {wishlistItems.map(item => (
            <div
              key={item.id}
              className="wishlist-item"
              onClick={() => goToProduct(item.id)}
            >
              <img src={item.image} alt={item.name} />

              <div className="item-info">
                <h4>{item.name}</h4>
                <span>${item.price}</span>
              </div>

              <div className="item-actions">
                <button
                  className="icon-btn delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Remove:", item.id);
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== RENDER =====
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
