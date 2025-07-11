// src/components/HeroSection.jsx
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { useAuth } from "./AuthContent"; // Make sure the path is correct

function HeroSection() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Function to handle protected route clicks
  const handleProtectedNavigation = (path) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <section className="hero">
      <h1 className="hero-title">♻️ The Clothes Exchange</h1>
      <p className="hero-subtitle">
        Reuse, Rewear, Reconnect — a smarter way to share your wardrobe.
      </p>
      <div className="hero-buttons">
        <button 
          className="hero-button" 
          onClick={() => handleProtectedNavigation('/browse')}
        >
          Start Browsing
        </button>
        <button 
          className="hero-outline-button" 
          onClick={() => handleProtectedNavigation('/list')}
        >
          List an Item
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
