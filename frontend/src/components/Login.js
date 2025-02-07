import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Show success message
    alert("Login successful!");

    // Redirect to homepage after 1 second
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="h-screen flex">
      {/* Left Section with Background Image and Overlay */}
      <div className="relative w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('/images/signup-bg.jpg')` }}>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Content on Top of Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-8">
          <img src="/images/logo.png" alt="SwiftCuisine Logo" className="h-16 mb-8" />
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-lg text-center">
            Igniting Your Passion for Cooking with Instant Inspiration and Effortless Elegance
          </p>
        </div>
      </div>

      {/* Right Section with Login Form */}
      <div className="w-1/2 flex items-center justify-center px-16" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
        <div className="w-full max-w-md">
          <h2 className="text-green-400 text-3xl font-bold mb-8">Sign in</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                Email Or Username
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email or username"
                className="w-full mt-2 px-4 py-2 bg-transparent border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="●●●●●●●●"
                className="w-full mt-2 px-4 py-2 bg-transparent border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="stayLoggedIn"
                  className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-500"
                />
                <label htmlFor="stayLoggedIn" className="ml-2 text-sm text-gray-400">
                  Stay Logged in
                </label>
              </div>
              <a href="#" className="text-sm text-green-400 hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full py-2 bg-green-500 text-black text-lg font-bold rounded-md hover:bg-green-600"
              >
                Sign in →
              </button>
              <button
                type="button"
                className="w-full py-2 border border-green-500 text-green-400 text-lg font-bold rounded-md hover:bg-green-500 hover:text-black"
                onClick={() => navigate("/signup")} // Redirect to signup page
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
