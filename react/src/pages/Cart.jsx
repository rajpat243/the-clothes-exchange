import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Vintage Denim Jacket",
      price: 89.99,
      description: "Classic blue denim jacket with brass buttons. Size M. Slightly worn for that perfect vintage look.",
      image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Jackets"
    },
    {
      id: 2,
      title: "White Graphic T-Shirt",
      price: 24.99,
      description: "100% cotton graphic tee with minimalist design. Size L. Perfect for casual everyday wear.",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Shirts"
    },
    {
      id: 3,
      title: "Black Leather Boots",
      price: 129.99,
      description: "Genuine leather boots with rubber sole. Size 42. Water-resistant and durable for all-season wear.",
      image: "https://images.unsplash.com/photo-1542840410-3092f99611a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Shoes"
    }
  ]);

 
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);


  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    alert("Checkout functionality will be implemented in the future!");
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items yet.</p>
          <Link to="/browse" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="cart-item-details">
                  <h2 className="cart-item-title">{item.title}</h2>
                  <p className="cart-item-category">{item.category}</p>
                  <p className="cart-item-description">{item.description}</p>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                <button 
                  className="remove-item-btn" 
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.title} from cart`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>${totalPrice}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <Link to="/browse" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
