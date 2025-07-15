import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGet, fetchPost } from "../hooks/useFetch"; // Add fetchPost import
import "../styles/ItemPage.css";
import { useCart } from "../components/CartContext";

// Remove these imports as they won't be needed anymore
// import topImg from "../assets/tops-placeholder.jpg";
// import bottomImg from "../assets/bottoms-placeholder.jpg";
// import shoesImg from "../assets/shoes-placeholder.jpg";
// import accessoryImg from "../assets/accessories-placeholder.jpg";

import similarItems from "../data/similar_items.json";
import ItemCard from "../components/ItemCard";

function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, showNotification } = useCart();

  // This function is now a fallback for items without imgUrl
  const getDefaultImage = (category) => {
    switch (category?.toLowerCase()) {
      case "top": 
        return "https://via.placeholder.com/150?text=Top";
      case "bottom": 
        return "https://via.placeholder.com/150?text=Bottom";
      case "shoes": 
        return "https://via.placeholder.com/150?text=Shoes";
      case "accessory":
      case "accessories": 
        return "https://via.placeholder.com/150?text=Accessory";
      default: 
        return "https://via.placeholder.com/150?text=No+Image";
    }
  };

  useEffect(() => {
    if (!id) return;

    // Fetch the current item
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

    // Fetch all products (to look up similar items)
    fetchGet("http://localhost:3002/api/product/1/1000")
      .then((data) => {
        if (Array.isArray(data)) {
          setAllProducts(data);
        }
      });
  }, [id]);

  // Move handleAddToCart outside of useEffect
  const handleAddToCart = () => {
    if (!item) return;
    
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

  // Map titles from JSON to actual product objects from DB
  const relatedTitles = similarItems[item.title] || [];
  const relatedItems = relatedTitles
    .map(title =>
      allProducts.find(
        (p) => p.title.toLowerCase() === title.toLowerCase()
      )
    )
    .filter(Boolean)
    .slice(0, 5);

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
          // Use imgUrl from the database with a fallback
          src={item.imgUrl || getDefaultImage(item.category)}
          alt={item.title}
          className="item-image"
        />

        <div className="item-info">
          <h2>{item.title}</h2>
          <p className="price-tag">
            {item.price === 0 ? "Free" : `$${item.price.toFixed(2)}`}
          </p>
          <p className="item-category">Category: {item.category}</p>
          {/* Add onClick handler to the button */}
          <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>

      <div className="item-description">
        <h3>Description</h3>
        <p>{item.description || "No description available."}</p>
      </div>

      <div className="similar-items-section">
        <h3>Similar Items</h3>
        <div className="similar-items-grid">
          {relatedItems.map((simItem) => (
            <Link key={simItem._id} to={`/item/${simItem._id}`}>
              <ItemCard
                title={simItem.title}
                price={simItem.price}
                category={simItem.category}
                // Use imgUrl from the database with a fallback
                image={simItem.imgUrl || getDefaultImage(simItem.category)}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
