const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  isBookmarked: { type: Boolean, default: false }
});

// Prevent model overwrite error
module.exports = mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
