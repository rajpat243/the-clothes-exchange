import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContent"; // Make sure the path is correct

function CategorySection() {
  const categories = ["Tops", "Bottoms", "Shoes", "Accessories", "All"];
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Function to handle protected route clicks
  const handleCategoryClick = (category) => {
    if (!user) {
      navigate('/login');
    } else {
      if (category === "All") {
        navigate('/browse');
      } else {
        navigate(`/browse?category=${category}`);
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
