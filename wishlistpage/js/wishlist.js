const { useState } = React;

function Wishlist() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "good girl bad girl",
      price: "98 RM",
      description:
        "Effortless and sustainable wardrobe essentials designed for everyday comfort.",
      image: "images/item1.jpg"
    },
    {
      id: 2,
      name: "Everyday new me",
      price: "220 RM",
      image: "images/item2.jpg"
    },
    {
      id: 3,
      name: "Rizzo tips",
      price: "20 RM",
      image: "images/item3.jpg"
    },
    {
      id: 4,
      name: "Mindy is one to talk",
      price: "23 RM",
      image: "images/item4.jpg"
    }
  ]);

  const [selected, setSelected] = useState(items[0]);

  const handleAddToCart = (item) => {
    console.log("Add to cart:", item);
    // Later: connect to backend
  };

  const handleDelete = (id) => {
    console.log("Delete from wishlist:", id);
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    if (selected?.id === id) {
      setSelected(updated[0] || null);
    }
  };

  return (
    <div className="wishlist-wrapper">
      <div className="wishlist-container">

        {/* LEFT PREVIEW */}
        <div className="preview-card">
          {selected && (
            <>
              <div className="preview-image">
                <img src={selected.image} alt={selected.name} />
              </div>

              <div className="preview-title">{selected.name}</div>
              <div className="preview-price">{selected.price}</div>
              <div className="preview-desc">{selected.description}</div>

              <div className="preview-actions">
                <button
                  className="add-cart"
                  onClick={() => handleAddToCart(selected)}
                >
                  <i className="fa-solid fa-cart-shopping"></i>&nbsp; ADD TO CART
                </button>
              </div>
            </>
          )}
        </div>

        {/* RIGHT LIST */}
        <div className="list-card">
          <div className="list-header">MY WISHLIST</div>

          {items.map(item => (
            <div
              key={item.id}
              className="wishlist-item"
              onClick={() => setSelected(item)}
            >
              <img src={item.image} alt={item.name} />

              <div className="item-info">
                <h4>{item.name}</h4>
                <span>{item.price}</span>
              </div>

              <div className="item-actions">
                <button
                  className="icon-btn"
                  title="Add to cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>

                <button
                  className="icon-btn delete"
                  title="Remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

ReactDOM
  .createRoot(document.getElementById("root"))
  .render(<Wishlist />);
