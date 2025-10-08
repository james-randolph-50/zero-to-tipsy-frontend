import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import Contact from "./pages/Contact";
import RecipeDetail from "./pages/RecipeDetail";

function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:documentId" element={<RecipeDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
