import { Link, useLocation } from "react-router-dom"; 
import "../styles/Navbar.css";
import { useAuth } from "./AuthContent";

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { user, logout } = useAuth(); // Get user and logout from context
  
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
      {isHomePage ? (
        <div className="navbar-auth">
          {user ? (
            <div className="user-greeting">
              <span>Hi, {user.name}</span>
              <button onClick={logout} className="logout-btn">Log Out</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="login-btn">Log In</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          )}
        </div>
      ) : (
        <div className="navbar-cart">
          <Link to="/cart" className="cart-icon" aria-label="Shopping Cart">
            🛒
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
