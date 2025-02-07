const express = require('express');
const User = require('../models/user');
const Recipe = require('../models/recipe');
const { authenticate } = require('./auth');
const bookmarkSchema = require('../schemas/bookmarkSchema'); // Import the Zod schema
const router = express.Router();

// Bookmark a recipe
router.post('/recipe', authenticate, async (req, res) => {
  const { recipeId } = req.body;

   // Validate request using safeParse
   const validationResult = bookmarkSchema.safeParse({ recipeId });

   if (!validationResult.success) {
     // Flatten validation errors
     return res.status(400).json({ message: 'Validation failed', errors: validationResult.error.flatten() });
   }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.bookmarks.includes(recipeId)) {
      return res.status(400).json({ message: 'Recipe already bookmarked' });
    }

    user.bookmarks.push(recipeId);
    await user.save();

    res.status(200).json({ message: 'Recipe bookmarked successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error bookmarking recipe', error: err.message });
  }
});

// Get all bookmarks
router.get('/bookmarks', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('bookmarks');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Bookmarked recipes fetched successfully', bookmarks: user.bookmarks });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookmarks', error: err.message });
  }
});

// Remove a bookmark
router.delete('/recipe', authenticate, async (req, res) => {
  const { recipeId } = req.body;

   // Validate request using safeParse
   const validationResult = bookmarkSchema.safeParse({ recipeId });

   if (!validationResult.success) {
     // Flatten validation errors
     return res.status(400).json({ message: 'Validation failed', errors: validationResult.error.flatten() });
   }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.bookmarks = user.bookmarks.filter((id) => id.toString() !== recipeId);
    await user.save();

    res.status(200).json({ message: 'Recipe removed from bookmarks' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing bookmark', error: err.message });
  }
});

module.exports = router;
