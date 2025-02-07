const { z } = require('zod');

// Recipe Schema
const recipeSchema = z.object({
  name: z.string().min(3, "Recipe name must be at least 3 characters long"),
  ingredients: z.array(z.string().min(1, "Ingredient name cannot be empty")),
  steps: z.array(z.string().min(1, "Each step must be described")),
  category: z.enum(["Essentials", "Vegetables and Greens", "Fruits"], {
    errorMap: () => ({ message: "Category must be one of 'Essentials', 'Vegetables and Greens', or 'Fruits'" }),
  }),
});

module.exports = recipeSchema;
