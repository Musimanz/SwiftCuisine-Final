import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa"; // Import heart icon
import { Link } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const RecipesPage = () => {
  const [allCategories] = useState([
    "Vegetables",
    "Baking Supplies",
    "Beverages",
    "Breakfast Items",
    "Preserved Foods",
    "Cheese",
    "Condiments",
    "Dairy",
    "Dried Fruits",
    "Ethnic Ingredients",
    "Frozen Foods",
    "Fruits",
    "Grains and Cereals",
    "Legumes and Pulses",
    "Meat",
    "Miscellaneous",
    "Nuts and Seeds",
    "Oils and Fats",
    "Prepared Foods",
    "Plant-Based Proteins",
    "Sauces",
    "Seafood",
    "Seasonings",
    "Snacks",
    "Spices and Herbs",
    "Sweeteners",
  ]);

  const [selectedCategory, setSelectedCategory] = useState("Vegetables");
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favoriteRecipes,setFavoriteRecipes] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Fetch ingredients when a category is selected
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/api/ingredients?category=${selectedCategory}&limit=25`
        );
        setIngredients(response.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, [selectedCategory]);

  // Function to toggle ingredient selection
  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredient)
        ? prevSelected.filter((item) => item !== ingredient) // Remove if already selected
        : [...prevSelected, ingredient] // Add if not selected
    );
  };

  // Function to clear all selected ingredients
  const clearSelectedIngredients = () => {
    setSelectedIngredients([]);
  };

  // Function to handle search input
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 1) {
      try {
        const response = await axios.get(
          `${API_BASE}/api/ingredients/search?query=${query}`
        );

        // Remove duplicates by creating a Set of unique ingredient names
        const uniqueResults = Array.from(new Set(response.data.map(item => item.name)))
          .map(name => response.data.find(item => item.name === name));

        setSearchResults(uniqueResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Function to generate recipes from GPT API
  const generateRecipes = async () => {
    if (selectedIngredients.length === 0) {
      alert("Please select at least one ingredient!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/api/recipes/generate`, {
        ingredients: selectedIngredients,
      });

      setRecipes(response.data.recipes); // Store the recipes in state
    } catch (error) {
      console.error("Error generating recipes:", error);
      alert("Failed to generate recipes. Please try again.");
    }
    setLoading(false);
  };

  // Function to add recipe to favorites
  const addToFavorites = async (recipe) => {
    try {
      const response = await axios.post(`${API_BASE}/api/recipes/bookmark`, {
        name: recipe.name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
      });
  
      if (response.status === 200 || response.status === 201) {
        setFavoriteRecipes((prev) => new Set([...prev, recipe.name]));
        alert("Recipe added to favorites!");
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error.response?.data || error.message);
      alert("Failed to save recipe. " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="pt-14 pb-36 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/swift-bg.jpg')" }}>

      {/* Ingredients Header with Dropdown */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Ingredients</h1>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mt-4 px-4 py-2 bg-black text-white border border-green-500 rounded-lg focus:outline-none"
        >
          {allCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Ingredient List for Selected Category */}
      <div className="flex justify-center">
        <div className="bg-[#001c1b] rounded-3xl p-6 w-[80%] max-w-4xl text-center border-2 border-green-500">
          <h2 className="text-2xl font-semibold mb-4">{selectedCategory}</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {ingredients.length > 0 ? (
              ingredients.map((item, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 border-2 rounded-full cursor-pointer transition-all ${
                    selectedIngredients.includes(item.name)
                      ? "bg-green-500 text-black"
                      : "bg-black border-green-500 hover:bg-green-500 hover:text-black"
                  }`}
                  onClick={() => toggleIngredient(item.name)}
                >
                  {item.name}
                </span>
              ))
            ) : (
              <p className="text-gray-400">No ingredients found</p>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mt-8">
        <div className="w-[80%] max-w-4xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Search Ingredients:</h2>
          <input
            type="text"
            placeholder="Search for an ingredient..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border border-green-500 bg-black text-white rounded-md focus:outline-none"
          />
          {searchResults.length > 0 && (
            <ul className="bg-[#001c1b] border border-green-500 rounded-md mt-2 w-full">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-green-500 hover:text-black"
                  onClick={() => {
                    toggleIngredient(result.name);
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                >
                  {result.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>


      {/* Selected Ingredients */}
      <div className="mt-8 px-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Selected Ingredients:</h2>
        {selectedIngredients.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {selectedIngredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="bg-green-500 text-black px-3 py-1 rounded-full cursor-pointer"
                  onClick={() => toggleIngredient(ingredient)}
                >
                  {ingredient} ✕
                </span>
              ))}
            </div>
            {/* Clear All Button */}
            <button
              onClick={clearSelectedIngredients}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition duration-200"
            >
              Clear All
            </button>
          </>
        ) : (
          <p className="text-gray-400">No ingredients selected</p>
        )}
      </div>


      {/* Generate Recipes Button */}
      <div className="text-center mt-8">
        <button
          onClick={generateRecipes}
          className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-full transition duration-200"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Recipes"}
        </button>
      </div>

      {/* Recipe Display Section */}
      <div className="mt-12 px-12">
        <h2 className="text-3xl font-semibold mb-6">Generated Recipes:</h2>
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recipes.map((recipe, index) => (
              <div key={index} className="bg-[#001c1b] p-6 rounded-2xl border border-green-500 relative">
                <h3 className="text-2xl font-bold text-green-400">{recipe.name}</h3>
                <p className="text-gray-300 mt-2">
                  <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                </p>
                <p className="text-gray-400 mt-2">{recipe.instructions}</p>
                <button
                  onClick={() => addToFavorites(recipe)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                >
                  <FaHeart />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No recipes generated yet.</p>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
