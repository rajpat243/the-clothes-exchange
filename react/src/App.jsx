import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "../src/components/Navbar";
import Browse from "./pages/Browse";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ItemPage from "./pages/ItemPage";
import NewProduct from "./pages/NewProduct";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import { CartProvider } from "./components/CartContext"; // Import the CartProvider

function App() {
  return (
    <CartProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/list" element={<NewProduct/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/Cart" element={<Cart/>}/>
        {/* */}
      </Routes>
    </CartProvider>
  );
}

export default App;
