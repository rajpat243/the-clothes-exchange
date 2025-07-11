import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGet, fetchPost } from "../hooks/useFetch";
import "../styles/ItemPage.css";

import topImg from "../assets/tops-placeholder.jpg";
import bottomImg from "../assets/bottoms-placeholder.jpg";
import shoesImg from "../assets/shoes-placeholder.jpg";
import accessoryImg from "../assets/accessories-placeholder.jpg";

import similarItems from "../data/similar_items.json";




function ItemPage() {


      
  const { id } = useParams(); // MongoDB ObjectId passed in URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCategoryImage = (category) => {
    switch (category?.toLowerCase()) {
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

  useEffect(() => {
    if (!id) return;

    fetchGet(`http://localhost:3002/api/product/${id}`)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItem(data[0]);
        } else {
          console.error("Invalid product data:", data);
        }
      })
      .catch((err) => console.error("Error fetching item:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const addToCart = () => {
    const url = 'http://localhost:3002/api/user/cart';
    const userId = localStorage.getItem('userId');
    const productId = item._id;
    fetchPost(url, {
      userId,
      productId
    })
  }

  if (loading) return <p>Loading item...</p>;
  if (!item) return <p>Item not found.</p>;

  const relatedItems = item
        ? similarItems
            .filter(
                (similar) =>
                similar.title.toLowerCase() !== item.title.toLowerCase() &&
                similar.category.toLowerCase() === item.category.toLowerCase()
            )
            .slice(0, 5)
        : [];

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
          <p className="price-tag">
            {item.price === 0 ? "Free" : `$${item.price.toFixed(2)}`}
          </p>
          <p className="item-category">Category: {item.category}</p>
          <button className="add-to-cart-button" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>

      <div className="item-description">
        <h3>Description</h3>
        <p>{item.description || "No description available."}</p>
      </div>

      <div className="similar-items-section">
        <h3>Similar Items</h3>
        <div className="similar-items-grid">
            {relatedItems.map((simItem, index) => (
            <ItemCard
                key={index}
                title={simItem.title}
                price={simItem.price}
                category={simItem.category}
                image={getCategoryImage(simItem.category)} // reuse your helper
            />
            ))}
        </div>
      </div>

    </div>
  );
}

export default ItemPage;
