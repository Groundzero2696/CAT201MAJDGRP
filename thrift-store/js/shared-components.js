// ===== SHARED HEADER COMPONENT =====
function SharedHeader() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      window.location.href = `listing.html?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const goHome = () => {
    window.location.href = "indexHP.html";
  };

  const goToListing = (category) => {
    window.location.href = "listing.html?category=" + category;
  };

  const goToWishlist = () => {
    window.location.href = "wishlist.html";
  };

  const goToCheckout = () => {
    window.location.href = "checkout.html";
  };

  return (
    <header className="shared-header">
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
  );
}

// ===== SHARED FOOTER COMPONENT =====
function SharedFooter() {
  return (
    <footer className="shared-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Thrifters4ever</h3>
          <p>Discover unique second-hand treasures with sustainable style</p>
        </div>

        <div className="footer-section">
          <h4>Shop</h4>
          <ul>
            <li><a href="listing.html?category=accessories">Accessories</a></li>
            <li><a href="listing.html?category=books">Books</a></li>
            <li><a href="listing.html?category=clothes">Clothes</a></li>
            <li><a href="listing.html?category=toys">Toys</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fa-brands fa-facebook"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
            <a href="#"><i className="fa-brands fa-tiktok"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Thrifters4ever. All rights reserved.</p>
      </div>
    </footer>
  );
}