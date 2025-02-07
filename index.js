const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Recipe Generator Backend!');
});

// Routes
const ingredientRoutes = require('./routes/ingredients');
const recipeRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/auth').router;
const bookmarkRoutes = require('./routes/bookmarks');
const blogRoutes = require('./routes/blogRoutes');
const populateIngredientsRoutes = require("./routes/populateIngredients");

app.use(cors());
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/recipes', recipeRoutes); // Recipe routes
app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/blog', blogRoutes);
app.use("/api/ingredients", populateIngredientsRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
