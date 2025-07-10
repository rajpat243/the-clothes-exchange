import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/NewProduct.css';

function NewProduct() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:3002/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title, 
          price: parseFloat(price), 
          category, 
          description 
        })
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Product created:', data);
      
      // Show success popup
      setShowSuccessPopup(true);
      
      // Clear form
      setTitle('');
      setPrice('');
      setCategory('');
      setDescription('');
      
      // Redirect after a delay
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate('/');
      }, 2000);
      
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Error creating product. Please try again.');
    }
  };

  return (
    <div className="new-product-container">

      
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="success-popup-content">
            <div className="success-icon">✓</div>
            <h3>Item Added Successfully!</h3>
            <p>Your item has been listed.</p>
          </div>
        </div>
      )}
      
      <div className="new-product-card">
        <h1 className="new-product-title">List a New Item</h1>
        <p className="new-product-subtitle">Share your fashion with the community</p>
        
        {error && <div className="new-product-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="new-product-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter item name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="top">Tops</option>
              <option value="bottom">Bottoms</option>
              <option value="shoes">Shoes</option>
              <option value="accessory">Accessories</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your item (condition, size, brand, etc.)"
              rows="4"
              required
            />
          </div>
          
          <button type="submit" className="new-product-button">
            List Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewProduct;
