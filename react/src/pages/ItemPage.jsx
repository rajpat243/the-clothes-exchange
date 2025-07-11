import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGet, fetchPost } from "../hooks/useFetch";
import "../styles/ItemPage.css";
import { useCart } from "../components/CartContext";

import topImg from "../assets/tops-placeholder.jpg";
import bottomImg from "../assets/bottoms-placeholder.jpg";
import shoesImg from "../assets/shoes-placeholder.jpg";
import accessoryImg from "../assets/accessories-placeholder.jpg";

function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, showNotification } = useCart();

  const getCategoryImage = (category) => {
    // Your existing code
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

  const handleAddToCart = () => {
    const url = 'http://localhost:3002/api/user/cart';
    const userId = localStorage.getItem('userId');
    const productId = item._id;
    
    fetchPost(url, {
      userId,
      productId
    })
    .then(response => {
      // Add the item to our local cart state
      addToCart(item);
    })
    .catch(err => console.error("Error adding to cart:", err));
  }

  if (loading) return <p>Loading item...</p>;
  if (!item) return <p>Item not found.</p>;

  return (
    <div className="item-page">
      <Link to="/browse" className="back-button">← Back to Browse</Link>

      {/* Add notification popup */}
      {showNotification && (
        <div className="cart-notification">
          <p>Item added to cart!</p>
        </div>
      )}

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
          <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>

      {/* Rest of your component */}
    </div>
  );
}

export default ItemPage;
