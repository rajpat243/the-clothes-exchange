import { Link, useLocation, useNavigate } from "react-router-dom"; 
import "../styles/Navbar.css";
import { useAuth } from "./AuthContent";
import { useCart } from "./CartContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  
  // Function to handle protected route clicks
  const handleProtectedLink = (e, path) => {
    if (!user) {
      e.preventDefault();
      navigate('/login');
    } else {
      navigate(path);
    }
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">👕 TCE</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li>
          <a href="#" onClick={(e) => handleProtectedLink(e, '/browse')}>
            Browse
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => handleProtectedLink(e, '/list')}>
            List an Item
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => handleProtectedLink(e, '/profile')}>
            Profile
          </a>
        </li>
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
          {user ? (
            <Link to="/cart" className="cart-icon" aria-label="Shopping Cart">
              🛒
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          ) : (
            <a href="#" onClick={(e) => handleProtectedLink(e, '/cart')} className="cart-icon" aria-label="Shopping Cart">
              🛒
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </a>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
