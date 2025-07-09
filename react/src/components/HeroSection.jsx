// src/components/HeroSection.jsx
import { Link } from "react-router-dom";
import "../styles/Home.css";

function HeroSection() {
  return (
    <section className="hero">
      <h1 className="hero-title">♻️ The Clothes Exchange</h1>
      <p className="hero-subtitle">
        Reuse, Rewear, Reconnect — a smarter way to share your wardrobe.
      </p>
      <div className="hero-buttons">
        <Link to="/browse">
          <button className="hero-button">Start Browsing</button>
        </Link>
        <Link to="/list">
          <button className="hero-outline-button">List an Item</button>
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
