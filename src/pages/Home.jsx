import React, {
  useEffect,
  useState,
  lazy,
  Suspense,
  useCallback,
  memo,
} from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/firebase.config";
import { Link } from "react-router-dom";

// Lazy loaded components
const Navbar = lazy(() => import("../components/Navbar"));
const UserProfile = lazy(() => import("../components/UserProfile"));

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  // ✅ Memoized function to fetch recipes (useCallback ensures the reference remains stable)
  const fetchRecipes = useCallback(() => {
    const recipesRef = ref(db, "recipes");
    const unsubscribe = onValue(recipesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedRecipes = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setRecipes(loadedRecipes);
      } else {
        setRecipes([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Use effect to load data
  useEffect(() => {
    const unsubscribe = fetchRecipes();
    return () => unsubscribe();
  }, [fetchRecipes]);

  return (
    <div>
      {/* ✅ Suspense fallback while lazy components load */}
      <Suspense fallback={<div className="text-center p-4">Loading navbar...</div>}>
        <Navbar />
        <UserProfile />
      </Suspense>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white shadow-md rounded p-4">
            {/* ✅ Fallback for image */}
            {recipe.recipe_image_url && (
              <img
                src={recipe.recipe_image_url}
                alt={recipe.recipe_name}
                className="w-full h-48 object-cover rounded mb-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
            )}

            <h3 className="text-xl font-bold mb-1">{recipe.recipe_name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {recipe.recipe_description}
            </p>

            <Link
              to={`/recipes/${recipe.id}`}
              state={{ recipe }}
              className="text-blue-500 underline text-sm"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Home); // ✅ React.memo
