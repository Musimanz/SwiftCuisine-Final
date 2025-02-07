const { z } = require('zod'); // Import Zod library

const ingredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"), // 'name' must be a non-empty string
  category: z.enum(["Essentials", "Vegetables and Greens", "Fruits"], {
    errorMap: () => ({ message: "Invalid category" }), // Custom error message for invalid category
  }),
});

// Export ingredientSchema properly
module.exports = { ingredientSchema };

