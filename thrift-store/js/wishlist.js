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
      </div>
    </header>
  );
}

function App() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.length === 0) {
    return (
      <>
        <Header />
        <div className="section">
          <h2>Your wishlist is empty</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="section">
        <h2>My Wishlist</h2>

        <div className="product-grid">
          {wishlist.map(item => (
            <div
              key={item.id}
              className="product-card"
              onClick={() => window.location.href = `product.html?id=${item.id}`}
            >
              <div className="image-wrapper">
                <img src={item.image} className="product-img" />
              </div>

              <h4>{item.name}</h4>
              <p className="price">RM{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
