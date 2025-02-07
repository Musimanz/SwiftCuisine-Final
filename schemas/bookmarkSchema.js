const { z } = require('zod');

// Bookmark Schema
const bookmarkSchema = z.object({
  recipeId: z.string(),
});

module.exports = bookmarkSchema;