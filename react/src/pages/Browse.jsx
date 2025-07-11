import { useEffect, useState } from "react";
import { fetchGet } from "../hooks/useFetch";
import FilterSidebar from "../components/FilterSidebar";
import ItemCard from "../components/ItemCard";
import "../styles/Browse.css";
import topImg from "../assets/tops-placeholder.jpg";
import bottomImg from "../assets/bottoms-placeholder.jpg";
import shoesImg from "../assets/shoes-placeholder.jpg";
import accessoryImg from "../assets/accessories-placeholder.jpg";

function Browse() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState({
    Tops: false,
    Bottoms: false,
    Shoes: false,
    Accessories: false,
  });

  const getCategoryImage = (category) => {
    switch (category.toLowerCase()) {
      case "top":
        return topImg;
      case "bottom":
        return bottomImg;
      case "shoes":
        return shoesImg;
      case "accessory":
        return accessoryImg;
      case "accessories":
        return accessoryImg;
      default:
        return topImg; // fallback image
    }
  };

  useEffect(() => {
    console.log('inside')
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
        } else {
          console.error("Invalid product data:", data);
        }
      });
  }, [categories, page])

  return (
    <div className="browse-layout">
      <FilterSidebar categories={categories} onChange={setCategories} />

      <div className="browse-main">
        <div className="browse-header">
          <h2 className="browse-title">Browse All Items</h2>
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
          {products.length > 0 ? (
            products.map((item, i) => (
              <ItemCard
                key={i}
                id={item._id}
                title={item.title}
                price={item.price}
                image={getCategoryImage(item.category)}
                category={item.category}
              />
            ))
          ) : (
            <div className="no-products-message">
              {/* //No items found. Try adjusting your filters. */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Browse;
