import React from 'react'
import {useNavigate, useLocation,useParams} from "react-router"

const RecipeDetails = () => {

    const { state } = useLocation();//useLocation return the object current location(e.g. path,search ,hash state).we need to extract state from it 
    const { recipe } = state || {} //if state is not null then we can extract recipe from it otherwise it will be undefined
   const navigate= useNavigate();
     if(!recipe){
        return <div>
            <p>no recipe data found</p>
            <button onClick={()=> navigate("/home")}>go back home</button>
        </div>
     }
  return (
    
    <div>
      <div className="recipeDetailsWrapperFull max-w-4xl mt-4 mx-auto p-4">

        <img src={Object.values(recipe.recipe_image)[0]} alt='recipe_image' className='w-full rounded-lg object-cover mb-4'/>
        <p className='font-bold text-4xl font-primary_font text-red-400 mb-4'>{recipe.recipe_name}</p>
        <p className='text-[18px] font-primary_font mb-4 font-bold'>{recipe.recipe_description}</p>
        <p className='font-primary_font text-[21px] text-primary_color font-bold mb-2'>Ingredients:</p>
        <p className='font-primary_font text-[20px] text-black mb-4'>{recipe.recipe_ingredients}</p>
        <p className='font-bold text-red-400 text-[21px] font-primary_font mb-2'>Recipe Steps:</p>
        <p className='font-primary_font text-[20px] text-black mb-4'>{recipe.recipe_steps}</p>
        <p className=' text-primary text-[20px] font-primary_font'>Recipe Shared By:</p>
        <p className='text-bold text-[18px] font-primary_font text-primary_color mb-4'>{recipe.recipe_owner}</p>
        <p className='font-bold text-[21px] font-primary_font text-red-400 mb-4'><span className='font-bold text-[21px] font-primary_font text-primary_color'>Recipe Rating:</span>{recipe.recipe_rating}</p>


        <button onClick={()=> navigate("/home")}
        className="px-4 py-2.5 rounded-lg text-white text-[20px] bg-black font-medium cursor-pointer hover:bg-green-400 ">
          Go Back Home
        </button>

      </div>


    </div>
  )
}

export default RecipeDetails
