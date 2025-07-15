import { useEffect, useState } from "react";
import { fetchGet } from "../hooks/useFetch";
import { useLocation } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";
import ItemCard from "../components/ItemCard";
import "../styles/Browse.css";
// Remove these imports as they won't be needed anymore
// import topImg from "../assets/tops-placeholder.jpg";
// import bottomImg from "../assets/bottoms-placeholder.jpg";
// import shoesImg from "../assets/shoes-placeholder.jpg";
// import accessoryImg from "../assets/accessories-placeholder.jpg";

function Browse() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterParams = queryParams.getAll('filter');
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState({
    Tops: filterParams.includes('Tops'),
    Bottoms: filterParams.includes('Bottoms'),
    Shoes: filterParams.includes('Shoes'),
    Accessories: filterParams.includes('Accessories'),
  });

  // This function is no longer needed since we'll use imgUrl directly
  // But we'll keep a fallback version in case some products don't have imgUrl
  const getDefaultImage = (category) => {
    switch (category.toLowerCase()) {
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
    let selectedCategories = [];

    if(categories.Tops) {
      selectedCategories.push('top');
    }
    if(categories.Bottoms) {
      selectedCategories.push('bottom');
    }
    if(categories.Shoes) {
      selectedCategories.push('shoes');
    }
    if(categories.Accessories) {
      selectedCategories.push('accessory');
    }

    let url = `http://localhost:3002/api/product/${page}/24`;

    if (selectedCategories.length > 0) {
      url += `?categories=${selectedCategories.join(',')}`;
    }

    fetchGet(url) 
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
          setFilteredProducts(data); // Initialize filtered products with all products
        } else {
          console.error("Invalid product data:", data);
        }
      });
  }, [categories, page]);

  // Filter products when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // The filtering is already handled by the useEffect
  };

  return (
    <div className="browse-layout">
      <FilterSidebar categories={categories} onChange={setCategories} />

      <div className="browse-main">
        <div className="browse-header">
          <div className="browse-title-section">
            <h2 className="browse-title">Browse All Items</h2>
            
            {/* Search Bar - now positioned under the title */}
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              <button type="submit" className="search-button">
                🔍
              </button>
            </form>
          </div>
          
          <div className="pagination-controls">
            <button 
              className="pagination-button" 
              onClick={() => setPage(p => p > 1 ? p - 1 : p)}
              disabled={page === 1}
            >
              &lt;
            </button>
            <span className="page-indicator">Page {page}</span>
            <button 
              className="pagination-button" 
              onClick={() => setPage(p => p + 1)}
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="browse-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, i) => (
              <ItemCard
                key={i}
                id={item._id}
                title={item.title}
                price={item.price}
                // Use the imgUrl from the database, with a fallback if it doesn't exist
                image={item.imgUrl || getDefaultImage(item.category)}
                category={item.category}
              />
            ))
          ) : (
            <div className="no-products-message">
              {searchTerm ? `No products found matching "${searchTerm}"` : "Searching..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Browse;
