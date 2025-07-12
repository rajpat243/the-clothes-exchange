import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchPost } from "../hooks/useFetch";
import '../styles/NewProduct.css';

function NewProduct() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = 'http://localhost:3002/api/product';

      fetchPost(url, {
        title,
        price: parseFloat(price),
        category,
        description,
        imgUrl,
        userId: localStorage.getItem('userId'),
      }).then(() => {
        setShowSuccessPopup(true);

        // Clear form
        setTitle('');
        setPrice('');
        setCategory('');
        setDescription('');
        setImgUrl('');

        // Redirect after a delay
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate('/');
        }, 2000);
      });

    } catch (err) {
      console.error('Error creating product:', err);
      setError('Error creating product. Please try again.');
    }
  };

  return (
    <div className="new-product-container">
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
              <option value="other">Other</option>
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

          <div className="form-group">
            <label htmlFor="imgUrl">Image URL</label>
            <input
              type="url"
              id="imgUrl"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              placeholder="Paste image URL (e.g. from Unsplash or Imgur)"
              required
            />
          </div>
          {imgUrl && (
            <div className="image-preview">
              <img
                src={imgUrl}
                alt="Preview"
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
          )}


          <button type="submit" className="new-product-button">
            List Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewProduct;
