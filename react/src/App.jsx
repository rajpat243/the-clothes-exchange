import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "../src/components/Navbar";
import Browse from "./pages/Browse";
import ItemPage from "./pages/ItemPage";



function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path ="/browse" element={<Browse/>}/>
      <Route path="/item/:title" element={<ItemPage />} />
      {/* */}

    </Routes>
    </>
  );
}

export default App;
