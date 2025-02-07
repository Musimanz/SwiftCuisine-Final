const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const recipeSchema = require('../schemas/recipeSchema'); // Import the Zod schema

// Middleware to validate data using Zod
const validateWithSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json({ message: 'Validation failed', errors: err.errors });
  }
};

// Add a new recipe (Admin-only or for testing purposes)
router.post(
  '/',
  validateWithSchema(recipeSchema),
  async (req, res) => {
    const { name, ingredients, steps, category } = req.body;

    try {
      // Check if the recipe already exists
      const existingRecipe = await Recipe.findOne({ name });
      if (existingRecipe) {
        return res.status(400).json({ message: 'Recipe with this name already exists' });
      }

      // Create a new recipe
      const recipe = new Recipe({
        name,
        ingredients,
        steps,
        category,
      });

      // Save the recipe to the database
      await recipe.save();
      res.status(201).json({ message: 'Recipe added successfully', recipe });
    } catch (err) {
      res.status(500).json({ message: 'Error adding recipe', error: err.message });
    }
  }
);

router.get('/', async (req, res) => {
  try {
      const recipe = await Recipe.find();
      res.status(200).json(recipe);
  } catch (err) {
      res.status(500).json({ message: 'Error fetching ingredients', error: err.message });
  }
});

// Fetch recipes by selected ingredients
router.post('/search', async (req, res) => {
  const { selectedIngredients } = req.body;

  // Validate input using Zod
  const ingredientsSchema = recipeSchema
    .pick({ ingredients: true })
    .extend({
      selectedIngredients: z.array(z.string().min(1, "Ingredient name cannot be empty")),
    });

  try {
    ingredientsSchema.parse({ selectedIngredients });

    // Fetch all recipes from the database
    const recipes = await Recipe.find();

    // Process recipes to calculate matched and missing ingredients
    const suggestions = recipes
      .map((recipe) => {
        const matchedIngredients = recipe.ingredients.filter((ingredient) =>
          selectedIngredients.includes(ingredient)
        );
        const missingIngredients = recipe.ingredients.filter(
          (ingredient) => !selectedIngredients.includes(ingredient)
        );

        return {
          ...recipe.toObject(),
          matchedIngredients,
          missingIngredients,
        };
      })
      .filter((recipe) => recipe.matchedIngredients.length > 0); // Include only recipes with at least one matched ingredient

    // Return suggestions
    if (suggestions.length === 0) {
      return res.status(404).json({ message: 'No recipes found with the selected ingredients' });
    }

    res.status(200).json({ message: 'Recipe suggestions found', suggestions });
  } catch (err) {
    res.status(400).json({ message: 'Validation failed', errors: err.errors || err.message });
  }
});

// Fetch recipes by name
router.get('/searchByName', async (req, res) => {
  const { name } = req.query;

  // Validate input using Zod
  const nameSchema = z.object({
    name: z.string().min(1, "Recipe name is required for search"),
  });

  try {
    nameSchema.parse({ name });

    // Perform case-insensitive search using regular expressions
    const recipes = await Recipe.find({ name: { $regex: name, $options: 'i' } });

    if (recipes.length === 0) {
      return res.status(404).json({ message: 'No recipes found with the given name' });
    }

    res.status(200).json({ message: 'Recipes found', recipes });
  } catch (err) {
    res.status(400).json({ message: 'Validation failed', errors: err.errors || err.message });
  }
});

module.exports = router;
