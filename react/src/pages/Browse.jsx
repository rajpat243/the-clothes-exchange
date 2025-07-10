import ItemCard from "../components/ItemCard";
import "../styles/Browse.css";
import { useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import tops from "../../../JSON/tops.json"
import bottoms from "../../../JSON/bottoms.json"
import shoes from "../../../JSON/shoes.json"
import accessories from "../../../JSON/accessories.json"


function Browse() {

    
    const allItems = [
        ...tops.map((item) => ({
          title: item.title,
          tag: item.price === 0 ? "Free" : `$${item.price.toFixed(2)}`,
          image: `https://via.placeholder.com/200x200?text=${encodeURIComponent(item.title)}`,
          category: item.category,
        })),
        ...bottoms.map((item) => ({
          title: item.title,
          tag: item.price === 0 ? "Free" : `$${item.price.toFixed(2)}`,
          image: `https://via.placeholder.com/200x200?text=${encodeURIComponent(item.title)}`,
          category: item.category,
        })),
        ...shoes.map((item) => ({
          title: item.title,
          tag: item.price === 0 ? "Free" : `$${item.price.toFixed(2)}`,
          image: `https://via.placeholder.com/200x200?text=${encodeURIComponent(item.title)}`,
          category: item.category,
        })),
        ...accessories.map((item) => ({
          title: item.title,
          tag: item.price === 0 ? "Free" : `$${item.price.toFixed(2)}`,
          image: `https://via.placeholder.com/200x200?text=${encodeURIComponent(item.title)}`,
          category: item.category,
        })),
      ];
      
    const items = allItems

    const [filters, setFilters] = useState({
        Tops: false,
        Bottoms: false,
        Shoes: false,
        Accessories: false,
        freeOnly: false,
      });
      
      const isCategorySelected = filters.Tops || filters.Bottoms || filters.Shoes || filters.Accessories;

      const filteredItems = items.filter((item) => {
        // Filter by "Free Only"
        if (filters.freeOnly && !item.tag.toLowerCase().includes("free")) {
          return false;
        }
      
        // Filter by category — only apply if any are selected
        if (isCategorySelected) {
          if (
            (filters.Tops && item.category === "top") ||
            (filters.Bottoms && item.category === "bottom") ||
            (filters.Shoes && item.category === "shoes") ||
            (filters.Accessories && item.category === "accessories")
          ) {
            return true;
          }
          return false; // doesn't match any selected category
        }
      
        return true; // no category filters active
      });
      
  
  
      console.log("Mapped item data:", items);

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
            category={item.category}
            tag={item.tag}
          />
          
          
          ))}
        </div>
      </div>
    </div>
  );
  
}

export default Browse;
