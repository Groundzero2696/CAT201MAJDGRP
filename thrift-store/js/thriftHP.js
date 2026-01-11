// ===== NAVIGATION =====
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

function goToCheckout() {
  window.location.href = "checkout.html";
}

// ===== MAIN APP =====
function App() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      window.location.href = `listing.html?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Filter products by category
  const books = data.filter(p => p.category === 'books');
  const menswear = data.filter(p => p.subcategory === 'men');
  const womenswear = data.filter(p => p.subcategory === 'women');
  const accessories = data.filter(p => p.category === 'accessories');
  const toys = data.filter(p => p.category === 'toys');

  return (
    <div>
      {/* HEADER */}
      <header className="header">
        <div className="top-row">
          <div className="logo" onClick={goHome}>Thrifters4ever</div>

          <div className="search-wrapper">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input 
              type="text" 
              placeholder="Search for items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
            />
          </div>

          <div className="icon-group">
            <div className="icon-item">
              <i className="fa-regular fa-user"></i>
              <span>Account</span>
            </div>
            <div className="icon-item" onClick={goToWishlist}>
              <i className="fa-regular fa-heart"></i>
              <span>Wishlist</span>
            </div>
            <div className="icon-item" onClick={goToCheckout}>
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Cart</span>
            </div>
          </div>
        </div>

        <div className="category-bar">
          <span onClick={() => goToListing("accessories")}>Accessories</span>
          <span onClick={() => goToListing("books")}>Books</span>
          <span onClick={() => goToListing("clothes")}>Clothes</span>
          <span onClick={() => goToListing("toys")}>Toys</span>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <h1>Discover Pre-Loved Books & Fashion</h1>
        <p>Shop sustainably. Save more.</p>
      </section>

      {/* BEST SELLING BOOKS */}
      <section className="product-section">
        <div className="section-header">
          <h2>Best Selling Books</h2>
          <button onClick={() => goToListing('books')}>View All →</button>
        </div>
        <div className="product-row">
          {books.map(product => (
            <div key={product.id} className="product-card" onClick={() => goToProduct(product.id)}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <button className="wishlist-icon" onClick={(e) => { e.stopPropagation(); }}>
                  <i className="fa-regular fa-heart"></i>
                </button>
              </div>
              <div className="product-details">
                <h4>{product.name}</h4>
                <p className="price">RM{product.price}</p>
                <button className="cart-icon" onClick={(e) => { e.stopPropagation(); }}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MENSWEAR */}
      <section className="product-section">
        <div className="section-header">
          <h2>Menswear</h2>
          <button onClick={() => goToListing('clothes', 'men')}>View All →</button>
        </div>
        <div className="product-row">
          {menswear.map(product => (
            <div key={product.id} className="product-card" onClick={() => goToProduct(product.id)}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <button className="wishlist-icon" onClick={(e) => { e.stopPropagation(); }}>
                  <i className="fa-regular fa-heart"></i>
                </button>
              </div>
              <div className="product-details">
                <h4>{product.name}</h4>
                <p className="price">RM{product.price}</p>
                <button className="cart-icon" onClick={(e) => { e.stopPropagation(); }}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WOMEN */}
      <section className="product-section">
        <div className="section-header">
          <h2>Women</h2>
          <button onClick={() => goToListing('clothes', 'women')}>View All →</button>
        </div>
        <div className="product-row">
          {womenswear.map(product => (
            <div key={product.id} className="product-card" onClick={() => goToProduct(product.id)}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <button className="wishlist-icon" onClick={(e) => { e.stopPropagation(); }}>
                  <i className="fa-regular fa-heart"></i>
                </button>
              </div>
              <div className="product-details">
                <h4>{product.name}</h4>
                <p className="price">RM{product.price}</p>
                <button className="cart-icon" onClick={(e) => { e.stopPropagation(); }}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACCESSORIES */}
      <section className="product-section">
        <div className="section-header">
          <h2>Accessories</h2>
          <button onClick={() => goToListing('accessories')}>View All →</button>
        </div>
        <div className="product-row">
          {accessories.map(product => (
            <div key={product.id} className="product-card" onClick={() => goToProduct(product.id)}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <button className="wishlist-icon" onClick={(e) => { e.stopPropagation(); }}>
                  <i className="fa-regular fa-heart"></i>
                </button>
              </div>
              <div className="product-details">
                <h4>{product.name}</h4>
                <p className="price">RM{product.price}</p>
                <button className="cart-icon" onClick={(e) => { e.stopPropagation(); }}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOYS */}
      <section className="product-section">
        <div className="section-header">
          <h2>Toys</h2>
          <button onClick={() => goToListing('toys')}>View All →</button>
        </div>
        <div className="product-row">
          {toys.map(product => (
            <div key={product.id} className="product-card" onClick={() => goToProduct(product.id)}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <button className="wishlist-icon" onClick={(e) => { e.stopPropagation(); }}>
                  <i className="fa-regular fa-heart"></i>
                </button>
              </div>
              <div className="product-details">
                <h4>{product.name}</h4>
                <p className="price">RM{product.price}</p>
                <button className="cart-icon" onClick={(e) => { e.stopPropagation(); }}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Thrifters4ever. All rights reserved.</p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);