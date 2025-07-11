import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContent"; // Make sure the path is correct
import pic1 from "../assets/pic1.webp"; // Import the images
import pic2 from "../assets/pic2.webp";
import pic3 from "../assets/pic3.webp";

function FreeFindsSection() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Function to handle protected route clicks
  const handleSeeAllClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/browse');
    }
  };

  {/*Hard Coded Items (Replace with Backend API Database ) */}
  const items = [
    { title: "Zara Puffer Jacket", tag: "Free • Upcycle this", img: pic1 },
    { title: "Vintage Shorts", tag: "Free • Gift this", img: pic2 },
    { title: "Casual Floral Dress", tag: "Free", img: pic3 },
  ];

  // Function to handle item card clicks
  const handleItemClick = (item) => {
    if (!user) {
      navigate('/login');
    } else {
      // Navigate to the item detail page or appropriate page
      // For now, just navigate to browse
      navigate('/browse');
    }
  };

  return (
    <section className="free-section">
      <h2 className="section-title">🆓 Free Finds Near You</h2>
      <div className="free-grid">
        {items.map((item, i) => (
          <div 
            key={i} 
            className="card" 
            onClick={() => handleItemClick(item)}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={item.img} 
              alt={item.title} 
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover'
              }} 
            />
            <h3>{item.title}</h3>
            <p>{item.tag}</p>
          </div>
        ))}
      </div>
      <button 
        onClick={handleSeeAllClick} 
        className="see-all-link"
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer', 
          textDecoration: 'underline',
          fontSize: 'inherit',
          fontFamily: 'inherit',
          color: 'inherit'
        }}
      >
        See All Free Items →
      </button>
    </section>
  );
}

export default FreeFindsSection;
