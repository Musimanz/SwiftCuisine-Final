const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true, 
      enum: [
    "vegetables",
    "fruits",
    "dairy",
    "meat",
    "seafood",
    "grains & cereals",
    "legumes & pulses",
    "spices & herbs",
    "nuts & seeds",
    "oils & fats",
    "condiments",
    "sweeteners",
    "baking supplies",
    "beverages",
    "canned & preserved foods",
    "frozen foods",
    "snacks",
    "prepared foods",
    "proteins (plant-based)",
    "dried fruits",
    "cheese",
    "seasonings",
    "sauces",
    "breakfast items",
    "ethnic ingredients",
    "miscellaneous",
  ], // Update here
  },
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
