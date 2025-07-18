import React, { useState, useEffect } from 'react';
import { fetchDelete, fetchGet } from "../hooks/useFetch";
import { Link } from 'react-router-dom';
import '../styles/Cart.css';
import { useCart } from "../components/CartContext"; // Make sure the path is correct

function Cart() {
  const { cartItems, setCartItems, removeFromCart: contextRemoveFromCart } = useCart();
  
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const url = `http://localhost:3002/api/user/cart/${userId}`;
    fetchGet(url).then(data => {
      setCartItems(data || []);
    });
  }, [setCartItems]);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

  const removeFromCart = (itemId) => {
    const url = 'http://localhost:3002/api/user/cart';
    const userId = localStorage.getItem('userId');
    const productId = itemId;
    
    fetchDelete(url, {
      userId,
      productId
    }).then(() => {
      // Use the context's removeFromCart function to update the global state
      contextRemoveFromCart(itemId);
    });
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
              <div className="cart-item" key={item._id || item.id}>
                <div className="cart-item-image">
                  <img src={item.imgUrl} alt={item.title} />
                </div>
                <div className="cart-item-details">
                  <h2 className="cart-item-title">{item.title}</h2>
                  <p className="cart-item-category">{item.category}</p>
                  <p className="cart-item-description">{item.description}</p>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                <button 
                  className="remove-item-btn" 
                  onClick={() => removeFromCart(item._id)}
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
