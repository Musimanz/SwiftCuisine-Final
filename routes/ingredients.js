const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient');
const { addIngredientSchema, deleteIngredientSchema } = require('../schemas/ingredientSchema'); // Import zod schemas
const { z } = require('zod');

let selectedIngredients = []; // Temporary in-memory storage for selected ingredients

// Add a new ingredient
router.post('/', async (req, res) => {
    console.log('POST /api/ingredients called');
    console.log('Request body:', req.body);

    try {
        // Validate the request body using the addIngredientSchema
        const validatedData = addIngredientSchema.parse(req.body);

        // Check if the ingredient already exists
        const existingIngredient = await Ingredient.findOne({
            name: validatedData.name,
            category: validatedData.category,
        });
        if (existingIngredient) {
            return res.status(400).json({ message: 'Ingredient already exists' });
        }

        // Create and save the new ingredient
        const ingredient = new Ingredient(validatedData);
        await ingredient.save();
        res.status(201).json({ message: 'Ingredient added', ingredient });
    } catch (err) {
        if (err instanceof z.ZodError) {
            // Handle validation errors
            return res.status(400).json({ message: 'Validation error', errors: err.errors });
        }
        // Handle other errors
        res.status(500).json({ message: 'Error adding ingredient', error: err.message });
    }
});
// GET route to fetch ingredients by category
router.get("/", async (req, res) => {
    try {
      const { category, limit = 10 } = req.query;
      console.log("Received category:", category); // Debugging
  
      if (!category) {
        return res.status(400).json({ error: "Category is required" });
      }
  
      // Convert category into a case-insensitive regex pattern
      const regexCategory = new RegExp(`^${category}$`, "i");
  
      console.log("MongoDB Query:", { category: regexCategory });
  
      const ingredients = await Ingredient.find({ category: regexCategory }).limit(parseInt(limit));
  
      console.log("Fetched Ingredients:", ingredients);
  
      if (!ingredients.length) {
        return res.status(404).json({ error: `No ingredients found for category: ${category}` });
      }
  
      res.status(200).json(ingredients);
    } catch (error) {
      console.error("Error fetching ingredients:", error.message);
      res.status(500).json({ error: "Failed to fetch ingredients." });
    }
  });

// search ingredients
router.get("/search", async (req, res) => {
const { query } = req.query;
if (!query) {
    return res.status(400).json({ error: "Search query is required" });
}

try {
    const ingredients = await Ingredient.find({
    name: { $regex: query, $options: "i" }, // Case-insensitive search
    }).limit(10);

    res.status(200).json(ingredients);
} catch (error) {
    console.error("Error fetching search results:", error.message);
    res.status(500).json({ error: "Failed to fetch search results." });
}
});
  

//Get all ingredients
router.get("/", async (req, res) => {
    try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients); // Full ingredient list with category field
    } catch (error) {
    console.error("Error fetching ingredients:", error.message);
    res.status(500).json({ error: "Failed to fetch ingredients." });
    }
});
  
  
  

// Delete an ingredient
router.delete('/', async (req, res) => {
    console.log('DELETE /api/ingredients called');
    console.log('Request body:', req.body);

    try {
        // Validate the request body using the deleteIngredientSchema
        const validatedData = deleteIngredientSchema.parse(req.body);

        // Delete the ingredient by name and category
        const ingredient = await Ingredient.findOneAndDelete({
            name: validatedData.name,
            category: validatedData.category,
        });
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.status(200).json({ message: 'Ingredient deleted', ingredient });
    } catch (err) {
        if (err instanceof z.ZodError) {
            // Handle validation errors
            return res.status(400).json({ message: 'Validation error', errors: err.errors });
        }
        // Handle other errors
        res.status(500).json({ message: 'Error deleting ingredient', error: err.message });
    }
});

module.exports = router;
