const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");


// GET all blog posts
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

// GET a single blog post by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the blog post" });
  }
});

// POST a new blog post
router.post("/", async (req, res) => {
  try {
    const { title, description, content, image } = req.body;

    if (!title || !description || !content || !image) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newBlog = new Blog({ title, description, content, image });
    await newBlog.save();

    res.status(201).json({ message: "Blog post created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog post" });
  }
});

module.exports = router;
