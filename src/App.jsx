import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Registration from './pages/Registration'
import Login from './pages/Login'
import Home from './pages/Home'
import RecipeDetails from "./pages/RecipeDetails";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";
import FileUpload from "./pages/FileUpload"

const App = () => {
  return (

    
    <BrowserRouter>
    
      <Routes>
        
        <Route path="/" element={<Registration/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/recipes/:id" element={<RecipeDetails/>} />
        <Route path="/createRecipe" element={<CreateRecipe/>}/>
        <Route path="/edit/:id" element={<EditRecipe/>}/>
        <Route path="/fileUpload" element={<FileUpload/>}/>    

      </Routes>
      
    </BrowserRouter>
  );
};

export default App;
