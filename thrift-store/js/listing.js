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

// ===== GET PARAMETERS FROM URL =====
const params = new URLSearchParams(window.location.search);
const category = params.get("category");
const subcategory = params.get("subcategory");
const searchQuery = params.get("search");

// ===== MAIN COMPONENT =====
function App() {
  let filteredProducts = data;
  let pageTitle = "All Products";
  let pageDescription = "Browse our complete collection of sustainable, preloved items.";

  // Filter by search query
  if (searchQuery) {
    filteredProducts = data.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    pageTitle = `Search Results for "${searchQuery}"`;
    pageDescription = `Found ${filteredProducts.length} items matching your search.`;
  }
  // Filter by category and subcategory
  else if (category) {
    filteredProducts = data.filter(p => p.category === category);
    
    if (subcategory) {
      filteredProducts = filteredProducts.filter(p => p.subcategory === subcategory);
    }
  }

  const categoryNames = {
    'accessories': 'Accessories',
    'books': 'Books',
    'clothes': 'Clothes',
    'toys': 'Toys'
  };

  const subcategoryNames = {
    'fiction': 'Fiction',
    'mystery': 'Mystery',
    'thriller': 'Thriller',
    'men': 'Men',
    'women': 'Women',
    'jewelry': 'Jewelry',
    'bags': 'Bags',
    'eyewear': 'Eyewear',
    'plush': 'Plush',
    'educational': 'Educational',
    'games': 'Games',
    'collectibles': 'Collectibles'
  };

  const categoryDescriptions = {
    'accessories': 'Complete your look with our curated collection of vintage and preloved accessories.',
    'books': 'Discover amazing reads from our collection of preloved books in excellent condition.',
    'clothes': 'Find unique fashion pieces from our sustainable clothing collection.',
    'toys': 'Browse our selection of preloved toys, perfect for kids and collectors.'
  };

  if (category && !searchQuery) {
    pageTitle = categoryNames[category] || 'All Products';
    if (subcategory) {
      pageTitle += ` - ${subcategoryNames[subcategory]}`;
    }
    pageDescription = categoryDescriptions[category] || pageDescription;
  }

  return (
    <div className="container">
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <a href="indexHP.html">Home</a> / 
        {category && !searchQuery && (
          <>
            {' '}{categoryNames[category]}
            {subcategory && ` / ${subcategoryNames[subcategory]}`}
          </>
        )}
        {searchQuery && ' Search Results'}
      </div>

      {/* HEADER */}
      <h1 className="category-title">{pageTitle}</h1>
      <p className="category-description">{pageDescription}</p>

      {/* TOP BAR */}
      <div className="top-bar">
        <span style={{ color: '#777', fontSize: '14px' }}>
          {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
        </span>
        <select className="sort-dropdown">
          <option>Sort by: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest First</option>
        </select>
      </div>

      {/* PRODUCTS */}
      {filteredProducts.length > 0 ? (
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
              <p className="price">RM {product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '80px 20px',
          background: 'white',
          borderRadius: '16px',
          marginTop: '40px'
        }}>
          <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '60px', color: '#ddd', marginBottom: '20px' }}></i>
          <h2 style={{ marginBottom: '12px' }}>No items found</h2>
          <p style={{ color: '#777', marginBottom: '24px' }}>
            {searchQuery 
              ? `No results for "${searchQuery}". Try a different search term.`
              : 'No items available in this category.'}
          </p>
          <button 
            onClick={goHome}
            style={{
              padding: '12px 24px',
              background: '#0a7a3f',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}

// ===== RENDER =====
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);