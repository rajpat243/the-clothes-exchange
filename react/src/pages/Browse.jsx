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
  const [filters, setFilters] = useState({
    Tops: false,
    Bottoms: false,
    Shoes: false,
    Accessories: false,
    freeOnly: false,
  });

  useEffect(() => {
    fetchGet("http://localhost:3002/api/product") 
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
          console.log("Fetched Products:", data.map(p => `${p.title} - ${p.category}`));

        } else {
          console.error("Invalid product data:", data);
        }
      });
  }, []);

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

  const filteredItems = products.filter((item) => {
    if (filters.freeOnly && item.price > 0) return false;

    if (filters.Tops && item.category !== "top") return false;
    if (filters.Bottoms && item.category !== "bottom") return false;
    if (filters.Shoes && item.category !== "shoes") return false;
    if (filters.Accessories && item.category !== "accessory") return false;

    return true;
  });

  return (
    <div className="browse-layout">
      <FilterSidebar filters={filters} onChange={setFilters} />

      <div className="browse-main">
        <h2 className="browse-title">Browse All Items</h2>
        <div className="browse-grid">
          {filteredItems.map((item, i) => (
            <ItemCard
              key={i}
              title={item.title}
              price={item.price}
              image={getCategoryImage(item.category)}
              category={item.category}
            />
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default Browse;
