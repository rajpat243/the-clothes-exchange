import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "../src/components/Navbar";
import Browse from "./pages/Browse";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ItemPage from "./pages/ItemPage";
import NewProduct from "./pages/NewProduct";



function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path ="/browse" element={<Browse/>}/>
      <Route path = "/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup />} />
      <Route path="/item/:title" element={<ItemPage />} />
      <Route path="/list" element={<NewProduct/>}/>
      {/* */}

    </Routes>
    </>
  );
}

export default App;
