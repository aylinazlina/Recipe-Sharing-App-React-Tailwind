import React from "react";
import Recipe_1 from "../assets/images/RecipeImage_1.jpg"
import Recipe_2 from "../assets/images/RecipeImage_2.jpg"
import Recipe_3 from "../assets/images/RecipeImage_3.jpg"
import Recipe_4 from "../assets/images/RecipeImage_4.jpg"
import Recipe_5 from "../assets/images/RecipeImage_5.jpg"
import Recipe_6 from "../assets/images/RecipeImage_6.jpg"
const Home = () => {

const cardsInfo =[
  {id:1,
    recipe_name:"Bean Soup",
    recipe_image:{Recipe_2},
    recipe_description:"very delicious and easy to make",
    recipe_ingredients:"all purpose flour, eggs, salt, pepper, cheese",
    recipe_steps:"1. Boil water, 2. Cook spaghetti, 3. Mix ingredients",
    recipe_owner:"Alice",
    recipe_rating:"4.5"
  },

   {id:2,
    recipe_name:"Almond Cake",
    recipe_image:{Recipe_1},
    recipe_description:"A delicious cake made with almond flour",
    recipe_ingredients:"Almond flour, sugar, eggs, butter, baking powder",
    recipe_steps:"1. Preheat oven, 2. Mix ingredients, 3. Bake for 30 minutes",
    recipe_owner:"David",
    recipe_rating:"4.7"
  },


   {id:3,
    recipe_name:"Strawberry Fruit Shake",
    recipe_image:{Recipe_3},
    recipe_description:"A refreshing mix of seasonal fruits",
    recipe_ingredients:"Apples, bananas, oranges, grapes, honey",
    recipe_steps:"1. Chop fruits, 2. Mix in a bowl, 3. Drizzle with honey",
    recipe_owner:"Maria",
    recipe_rating:"4.2"
  },

   {id:4,
    recipe_name:"Chicken Enchiladas",
    recipe_image:{Recipe_4},
    recipe_description:"A spicy Mexican dish with tortillas and chicken",
    recipe_ingredients:"Black beans, bell peppers, onions, tomatoes, spices",
    recipe_steps:"1. Soak beans, 2. Cook with vegetables, 3. Simmer for 1 hour",
    recipe_owner:"John",
    recipe_rating:"5.0"
  },

   {id:5,
    recipe_name:"Pasta Primavera",
    recipe_image:{Recipe_5},
    recipe_description:"A classic Italian pasta dish with fresh vegetables",
    recipe_ingredients:"Tortillas, chicken, cheese, enchilada sauce, onions",
    recipe_steps:"1. Prepare chicken, 2. Fill tortillas, 3. Bake with sauce",
    recipe_owner:"Emily",
    recipe_rating:"5.0"
  },

   {id:6,
    recipe_name:"Yogurt Parfait",
    recipe_image:{Recipe_6},
    recipe_description:"A healthy breakfast with yogurt and fruits",
    recipe_ingredients:"Yogurt, granola, mixed berries, honey",
    recipe_steps:"1. Layer yogurt, 2. Add granola, 3. Top with berries and honey",
    recipe_owner:"Sophia",
    recipe_rating:"4.5"
  },
] 



  return (
    <div>

    <div className="w-[50px] h-[50px] bg-green-500 rounded-full mt-5 ml-[92%]">
      
    </div>

      <h1 className="font-bold text-red-500 ml-[40%] mt-[5%] text-[50px]">Recipes Shared</h1>

      <div className="CardsWrapperFull flex flex-wrap justify-content-around mt-20 gap-4 mb-7">
        

        {cardsInfo?.map((card)=>(
          <div class="bg-white [box-shadow:0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-2xl overflow-hidden mx-auto mt-4">
          <div class="aspect-[3/2]">
            <img className="w-full h-full object-fit-cover" 
            src={card.recipe_image[Object.keys(card.recipe_image)]}
            alt={card.recipe_name}/>
            
          </div>

          

          <div className="p-6">
          <div className="flex ">
            <h3 className="text-2xl text-slate-900 font-bold">{card.recipe_name}</h3>
            <div className="bg-pink-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 fill-pink-600"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
          </div>

          <p className="text-primary_color text-[22px] text-medium">{card.recipe_owner}</p>
            <div className="mt-8 flex items-center">
              <h3 className="text-xl text-slate-900 font-bold flex-1">{card.recipe_rating} ⭐</h3>
              
               <button type="button"
            className="px-4 py-2.5 rounded-lg text-white text-sm font-medium tracking-wider bg-blue-600 hover:bg-blue-700 outline-none cursor-pointer">
             View Details</button>
            </div>
          </div>
        </div>))}

  

      </div> 
      
    </div>
  );
};

export default Home;
