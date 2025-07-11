import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContent"; 

function CategorySection() {
  const categories = ["Tops", "Bottoms", "Shoes", "Accessories", "All"];
  const navigate = useNavigate();
  const { user } = useAuth();
  

  const handleCategoryClick = (category) => {
    if (!user) {
      navigate('/login');
    } else {
      if (category === "All") {
        navigate('/browse');
      } else {
      
        const categoryFilters = {
          Tops: false,
          Bottoms: false,
          Shoes: false,
          Accessories: false
        };
        
        categoryFilters[category] = true;
        
      
        const queryParams = new URLSearchParams();
        for (const [key, value] of Object.entries(categoryFilters)) {
          if (value) {
            queryParams.append('filter', key);
          }
        }
        
        navigate(`/browse?${queryParams.toString()}`);
      }
    }
  };
  
  return (
    <section className="category-section">
      <h2 className="section-title">Browse by Category</h2>
      <div className="category-buttons">
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => handleCategoryClick(cat)}
            className="category-button"
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
