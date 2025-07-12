import { createContext, useState, useContext, useEffect } from 'react';
import { fetchGet } from "../hooks/useFetch";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  
  // Load cart items when component mounts
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchGet(`http://localhost:3002/api/user/cart/${userId}`)
        .then(data => {
          setCartItems(data || []);
        })
        .catch(err => console.error("Error fetching cart:", err));
    }
  }, []);
  
  // Function to add item to cart
  const addToCart = (item) => {
    setCartItems(prev => [...prev, item]);
    setShowNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };
  
  // Function to remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item._id !== itemId));
  };
  
  // Function to update cart items directly (useful for syncing with API)
  const updateCartItems = (items) => {
    setCartItems(items);
  };
  
  return (
    <CartContext.Provider value={{ 
      cartItems, 
      setCartItems, 
      addToCart, 
      removeFromCart, 
      showNotification,
      setShowNotification,
      cartCount: cartItems.length,
      updateCartItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
