const Header = () => (
  <div className="header">
    <div className="top-row">
      <div className="logo">Thrifters4ever</div>

      <div className="search-wrapper">
        <input placeholder="Find your next treasure from 40,000+ pre-loved items" />
      </div>

      <div className="icon-group">
        <div className="icon-item">
          <i className="fa-regular fa-user"></i>
          <span>Account</span>
        </div>

        <div className="icon-item">
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
      <span>Books</span>
      <span>Menswear</span>
      <span>Womenswear</span>
    </div>
  </div>
);

const Hero = () => (
  <div className="hero">
    <h1>Discover Pre-Loved Books & Fashion</h1>
    <p>Shop sustainably. Save more.</p>
  </div>
);

const ProductCard = ({ title, price, image }) => (
  <div className="product-card">
    <div className="image-wrapper">

      {/* Wishlist Icon */}
      <div className="wishlist-icon">
        <i className="fa-regular fa-heart"></i>
      </div>

      <img src={image} alt={title} className="product-img" />
    </div>

    <h4>{title}</h4>
    <p className="price">{price}</p>

    {/* Add to Cart */}
    <button className="cart-btn">
      <i className="fa-solid fa-basket-shopping"></i>
    </button>
  </div>
);


const Section = ({ title, items }) => (
  <div className="section">
    <h2>{title}</h2>
    <div className="product-grid">
      {items.map((i, idx) => (
        <ProductCard key={idx} {...i} />
      ))}
    </div>
  </div>
);

const Footer = () => (
  <div className="footer">
    <h3>Contact & Information</h3>
    <p>
      <i className="fa-brands fa-whatsapp"></i> +60 11-7224-5129
    </p>
  </div>
);

const App = () => {
  const books = [
    { title: "Book One", price: "RM34.00", image: "./images/book1.jpg" },
    { title: "Book Two", price: "RM29.00", image: "./images/book2.jpg" }
  ];

  const men = [
    { title: "Men Jacket", price: "RM55.00", image: "./images/men1.jpg" }
  ];

  const women = [
    { title: "Women Dress", price: "RM60.00", image: "./images/women1.jpg" }
  ];

  return (
    <>
      <Header />
      <Hero />
      <Section title="Best Selling Books" items={books} />
      <Section title="Menswear" items={men} />
      <Section title="Womenswear" items={women} />
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
