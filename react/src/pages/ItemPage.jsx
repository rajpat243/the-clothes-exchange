import { useParams } from "react-router-dom";
import items from "../../../JSON/products.json";
import "../styles/ItemPage.css";
import { Link } from "react-router-dom";
import topImg from "../assets/tops-placeholder.jpg";
import bottomImg from "../assets/bottoms-placeholder.jpg";
import shoesImg from "../assets/shoes-placeholder.jpg";
import accessoryImg from "../assets/accessories-placeholder.jpg";

function ItemPage() {
    const getCategoryImage = (category) => {
        switch (category.toLowerCase()) {
          case "top":
            return topImg;
          case "bottom":
            return bottomImg;
          case "shoes":
            return shoesImg;
          case "accessory":
          case "accessories":
            return accessoryImg;
          default:
            return topImg;
        }
      };
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);

  const item = items.find(
    (itm) => itm.title.toLowerCase() === decodedTitle.toLowerCase()
  );

  if (!item) return <p>Item not found.</p>;

  return (
    <div className="item-page">
        <Link to="/browse" className="back-button">← Back to Browse</Link>
      <div className="item-page-content">
      <img
  src={getCategoryImage(item.category)}
  alt={item.title}
  className="item-image"
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
