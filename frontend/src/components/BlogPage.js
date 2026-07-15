import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // For navigating to the full blog post

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/blog`); // Backend API for fetching blogs
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="pt-14 text-white min-h-screen p-6 min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/images/swift-bg.jpg')" }}>
      <h1 className="text-4xl font-bold text-center mb-8">Our Blog</h1>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-[#001c1b] p-6 rounded-2xl border border-green-500">
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-2xl font-bold text-green-400">{blog.title}</h3>
              <p className="text-gray-300 mt-2">{blog.description.substring(0, 100)}...</p>
              
              <Link to={`/blog/${blog._id}`} className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded">
                Read More
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No blog posts available.</p>
      )}
    </div>
  );
};

export default BlogPage;
