import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  // Fetch the selected blog post
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p className="text-gray-500 text-center mt-8">Loading blog post...</p>;
  }

  return (
    <div className="pt-14 text-white min-h-screen p-6 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/swift-bg.jpg')" }}>
      <div className="max-w-3xl mx-auto">
        <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-md mb-6" />
        <h1 className="text-4xl font-bold text-green-400 mb-4">{blog.title}</h1>
        <p className="text-gray-300">{blog.content}</p>
        <Link to="/blog" className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded">
          Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;
