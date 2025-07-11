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
  const [categories, setCategories] = useState({
    Tops: false,
    Bottoms: false,
    Shoes: false,
    Accessories: false,
  });

  useEffect(() => {
    fetchGet("http://localhost:3002/api/product/1/24") 
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

  useEffect(() => {
    console.log('inside')
    let selectedCategories = [];

    if(categories.Tops) {
      selectedCategories.push('tops');
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
    console.log(url)
    console.log(categories)
    fetchGet(url) 
      .then((data) => {
        if (Array.isArray(data)) {
          console.log(data)
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
              id = {item._id}
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
