const express = require("express");
const router = express.Router();
const axios = require("axios");
const Ingredient = require("../models/ingredient"); // Adjust the path to your model
require("dotenv").config();

// OpenAI API key
const apiKey = process.env.OPENAI_API_KEY;

// Function to call GPT API to generate ingredients
async function generateIngredients(category) {
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const prompt = `List 50 common ${category} used in cooking across all cuisines.`;

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a culinary expert." },
      { role: "user", content: prompt },
    ],
  };

  try {
    const response = await axios.post(url, data, { headers });
    const ingredients = response.data.choices[0].message.content
      .split("\n")
      .map((item) => item.replace(/^\d+\.\s*/, "").trim())
      .filter((item) => item); // Remove empty or invalid entries
    return ingredients;
  } catch (error) {
    console.error("Error generating ingredients:", error.response?.data || error.message);
    throw new Error("Failed to generate ingredients.");
  }
}

// Route to populate database for multiple categories
router.post("/populate", async (req, res) => {
  const { categories } = req.body; // Expecting an array of categories in the request body

  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return res.status(400).json({ error: "Please provide a list of categories." });
  }

  try {
    const results = {};

    // Loop through each category and populate ingredients
    for (const category of categories) {
      const ingredients = await generateIngredients(category);

      // Save ingredients to MongoDB
      const savedIngredients = await Promise.all(
        ingredients
          .filter((name) => name && name.trim() !== "") // Ensure non-empty names
          .map(async (name) => {
            const ingredient = new Ingredient({ name, category });
            return ingredient.save();
          })
      );

      results[category] = savedIngredients; // Store results for the category
    }

    res.status(200).json({ message: "Ingredients added successfully", results });
  } catch (error) {
    console.error("Error saving ingredients:", error.message);
    res.status(500).json({ error: "Failed to save ingredients." });
  }
});

module.exports = router;
