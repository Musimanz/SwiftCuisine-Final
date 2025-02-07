import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa"; // Import trash icon for removing bookmarks

const BookmarkedRecipesPage = () => {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);

  // Fetch bookmarked recipes from the backend
  useEffect(() => {
    const fetchBookmarkedRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recipes/bookmarked");
        setBookmarkedRecipes(response.data);
      } catch (error) {
        console.error("Error fetching bookmarked recipes:", error);
      }
    };

    fetchBookmarkedRecipes();
  }, []);

  // Function to remove a recipe from bookmarks
  const removeBookmark = async (recipeId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/recipes/unbookmark", { id: recipeId });
  
      if (response.status === 200) {
        // Remove the recipe from UI
        setBookmarkedRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
        alert("Recipe removed from bookmarks!");
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
      alert("Failed to remove bookmark.");
    }
  };
  

  return (
    <div className="pt-14 text-white min-h-screen font-sans p-6 min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/images/swift-bg.jpg')" }}>
      <h1 className="text-4xl font-bold text-center mb-8">Bookmarked Recipes</h1>

      {bookmarkedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bookmarkedRecipes.map((recipe, index) => (
            <div key={index} className="bg-[#001c1b] p-6 rounded-2xl border border-green-500 relative">
              <h3 className="text-2xl font-bold text-green-400">{recipe.name}</h3>
              <p className="text-gray-300 mt-2">
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              </p>
              <p className="text-gray-400 mt-2">{recipe.instructions}</p>

              {/* Remove Bookmark Button */}
              <button
                className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition"
                onClick={() => removeBookmark(recipe._id)}
              >
                <FaTrash size={20} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No bookmarked recipes yet.</p>
      )}
    </div>
  );
};

export default BookmarkedRecipesPage;
