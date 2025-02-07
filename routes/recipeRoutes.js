const express = require("express");
const axios = require("axios");
require("dotenv").config();
const Recipe = require("../models/Recipe"); // Ensure this matches your model file path

const router = express.Router();
const apiKey = process.env.OPENAI_API_KEY;

// Function to call GPT API for structured recipe generation
async function generateRecipes(selectedIngredients) {
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const prompt = `
    Generate 10 unique recipes using the following ingredients: ${selectedIngredients.join(", ")}.
    Each recipe should be structured as follows:
    {
      "recipes": [
        {
          "name": "Recipe Name",
          "ingredients": ["Ingredient 1", "Ingredient 2"],
          "instructions": "Give Step-by-step cooking instructions here in less than 60 words."
        },
        ...
      ]
    }
    Return ONLY valid JSON output, without any explanations or additional text.
  `;

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a professional chef and recipe expert." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  };

  try {
    const response = await axios.post(url, data, { headers });
    const recipesText = response.data.choices[0].message.content.trim(); // Trim excess whitespace

    // Fix: Ensure GPT output is valid JSON
    const jsonStart = recipesText.indexOf("{");
    const jsonEnd = recipesText.lastIndexOf("}") + 1;
    const jsonResponse = recipesText.substring(jsonStart, jsonEnd);

    const recipes = JSON.parse(jsonResponse).recipes;

    return recipes;
  } catch (error) {
    console.error("Error generating recipes:", error.response?.data || error.message);
    throw new Error("Failed to generate recipes.");
  }
}

// POST route to generate recipes
router.post("/generate", async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ error: "Please provide a list of ingredients." });
  }

  try {
    const recipes = await generateRecipes(ingredients);
    res.status(200).json({ recipes });
  } catch (error) {
    console.error("Error generating recipes:", error.message);
    res.status(500).json({ error: "Failed to generate recipes." });
  }
});

//bookmark route
router.post("/bookmark", async (req, res) => {
  try {
    const { name, ingredients, instructions } = req.body;

    if (!name || !ingredients || !instructions) {
      return res.status(400).json({ error: "Missing recipe details." });
    }

    // Check if the recipe already exists in the database
    let existingRecipe = await Recipe.findOne({ name });

    if (existingRecipe) {
      if (existingRecipe.isBookmarked) {
        return res.status(400).json({ error: "Recipe is already bookmarked!" });
      }

      existingRecipe.isBookmarked = true;
      await existingRecipe.save();
      return res.status(200).json({ message: "Recipe already exists, marked as bookmarked!" });
    }

    // If recipe does not exist, create a new one with isBookmarked: true
    const newRecipe = new Recipe({
      name,
      ingredients,
      instructions,
      isBookmarked: true // ✅ Ensure this is always set
    });

    await newRecipe.save();
    res.status(201).json({ message: "Recipe bookmarked successfully!" });

  } catch (error) {
    console.error("Error bookmarking recipe:", error.message);
    res.status(500).json({ error: "Failed to bookmark recipe." });
  }
});

// unbookmark recipe
router.post("/unbookmark", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Missing recipe ID." });
    }

    // Find and update the recipe to remove the bookmark
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { $set: { isBookmarked: false } }, // ✅ Set isBookmarked to false instead of deleting
      { new: true } // Return updated document
    );

    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    res.status(200).json({ message: "Recipe unbookmarked successfully!", updatedRecipe });

  } catch (error) {
    console.error("Error unbookmarking recipe:", error.message);
    res.status(500).json({ error: "Failed to unbookmark recipe." });
  }
});

// GET route to fetch all bookmarked recipes
router.get("/bookmarked", async (req, res) => {
  try {
    const bookmarkedRecipes = await Recipe.find({ isBookmarked: true });
    res.status(200).json(bookmarkedRecipes);
  } catch (error) {
    console.error("Error fetching bookmarked recipes:", error);
    res.status(500).json({ error: "Failed to fetch bookmarked recipes." });
  }
});


module.exports = router;
