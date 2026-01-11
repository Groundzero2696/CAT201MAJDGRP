// ===== NAVIGATION FUNCTIONS =====
function goHome() {
  window.location.href = "indexHP.html";
}

// ===== TEMP CART DATA (FOR FRONTEND DEMO) =====
const cartItems = [
  { ...data[0], quantity: 1 },
  { ...data[4], quantity: 2 },
  { ...data[8], quantity: 1 }
];

// ===== MAIN COMPONENT =====
function App() {
  const [cart, setCart] = React.useState(cartItems);
  const [promoCode, setPromoCode] = React.useState('');

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const categoryNames = {
    'accessories': 'Accessories',
    'books': 'Books',
    'clothes': 'Clothes',
    'toys': 'Toys'
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-wrapper">
        <div className="checkout-header">
          <button className="back-btn" onClick={goHome}>
            <i className="fa-solid fa-arrow-left"></i>
            Continue Shopping
          </button>
        </div>
        
        <div className="cart-section">
          <div className="empty-cart">
            <i className="fa-solid fa-cart-shopping"></i>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <button className="shop-btn" onClick={goHome}>
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-wrapper">
      {/* HEADER */}
      <div className="checkout-header">
        <div className="header-content">
          <button className="back-btn" onClick={goHome}>
            <i className="fa-solid fa-arrow-left"></i>
            Continue Shopping
          </button>
          <h1>Shopping Cart</h1>
          <div style={{ width: '150px' }}></div>
        </div>
      </div>

      <div className="checkout-container">
        {/* LEFT SIDE - CART ITEMS */}
        <div className="cart-section">
          <h2 className="section-title">Cart Items ({cart.length})</h2>
          
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="item-details">
                  <div className="item-category">
                    {categoryNames[item.category]}
                  </div>
                  <h3>{item.name}</h3>
                  <p className="item-price">RM {item.price}</p>
                  
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, -1)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="item-actions">
                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <p className="item-price">
                    RM {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="summary-section">
          <h2 className="section-title">Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span className="amount">RM {subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span className="amount">RM {shipping.toFixed(2)}</span>
          </div>

          <div className="promo-section">
            <div className="promo-input">
              <input 
                type="text" 
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button className="apply-btn">Apply</button>
            </div>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span className="amount">RM {total.toFixed(2)}</span>
          </div>

          <button 
            className="checkout-btn"
            onClick={() => alert('Proceeding to payment... (Backend integration needed)')}
          >
            PROCEED TO CHECKOUT
          </button>

          <div className="secure-checkout">
            <i className="fa-solid fa-lock"></i>
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== RENDER =====
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);