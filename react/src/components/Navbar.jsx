import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">👕 TCE</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/browse">Browse</Link></li>
        <li><Link to="/list">List an Item</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      {isHomePage && (
        <div className="navbar-auth">
          <Link to="/login" className="login-btn">Log In</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
