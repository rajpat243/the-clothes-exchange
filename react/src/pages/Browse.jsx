import { useEffect, useState } from "react";
import { fetchGet } from "../hooks/useFetch";
import FilterSidebar from "../components/FilterSidebar";
import ItemCard from "../components/ItemCard";
import "../styles/Browse.css";

function Browse() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({
    Tops: false,
    Bottoms: false,
    Shoes: false,
    Accessories: false,
  });

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

    let url = 'http://localhost:3002/api/product/1/24';

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
  }, [categories])

  return (
    <div className="browse-layout">
      <FilterSidebar categories={categories} onChange={setCategories} />

      <div className="browse-main">
        <h2 className="browse-title">Browse All Items</h2>
        <div className="browse-grid">
          {products.map((item, i) => (
            <ItemCard
              key={i}
              title={item.title}
              price={item.price}
              image={`https://via.placeholder.com/200x200?text=${encodeURIComponent(item.title)}`}
              category={item.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Browse;
