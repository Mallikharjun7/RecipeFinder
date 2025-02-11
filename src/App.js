import Home from "./Pages/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recipe from "./Pages/Recipe";
import Contact from "./Pages/Contact";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SearchSingle from "./Components/SearchSingle";
import SingleRecipe from "./Components/SingleRecipe";

function App()
{
  return(
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Recipe" element={<Recipe />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="Home/:id" element={<SingleRecipe/>}/>
          <Route path="Recipe/:id" element={<SearchSingle />} />  
        </Routes>
        <Footer />
      </BrowserRouter>


    </>
  )
}
export default App;