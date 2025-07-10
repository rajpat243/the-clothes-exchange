import { useParams } from "react-router-dom";
import items from "../../../JSON/products.json";
import "../styles/ItemPage.css";

function ItemPage() {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);

  const item = items.find(
    (itm) => itm.title.toLowerCase() === decodedTitle.toLowerCase()
  );

  if (!item) return <p>Item not found.</p>;

  return (
    <div className="item-page">
      <div className="item-page-content">
        <img
          src={`https://via.placeholder.com/300x300?text=${encodeURIComponent(item.title)}`}
          alt={item.title}
        />

        <div className="item-info">
          <h2>{item.title}</h2>
          <p className="price-tag">{item.price === 0 ? "Free" : `$${item.price.toFixed(2)}`}</p>
          <p className="item-category">Category: {item.category}</p>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>

      <div className="item-description">
        <h3>Description</h3>
        <p>{item.description || "No description available."}</p>
      </div>

      {/* Optional: Similar items */}
      <div className="similar-items-section">
        <h3>Similar Items</h3>
        <div className="similar-items-grid">
          {/* You can map similar items here later */}
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
