import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Show success message
    alert("Sign-up successful!");

    // Redirect to homepage after 1 second
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/signup-bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Content Section */}
      <div className="relative z-10 bg-black bg-opacity-70 rounded-lg p-8 w-full max-w-4xl flex flex-col md:flex-row items-center">
        {/* Left Section */}
        <div className="flex-1 text-white text-center md:text-left p-4">
          <img src="/images/logo.png" alt="Logo" className="h-16 w-auto mb-4 mx-auto md:mx-0" />
          <h1 className="text-3xl font-bold mb-4">Don’t have an account?</h1>
          <p className="text-gray-300 mb-6">
            Igniting Your Passion for Cooking with Instant Inspiration and Effortless Elegance
          </p>
        </div>

        {/* Right Section (Sign-up Form) */}
        <div className="flex-1 bg-white rounded-lg p-6">
          <h2 className="text-2xl font-bold text-black mb-6">Sign up</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2">User Name</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex items-center mb-6">
              <input type="checkbox" className="mr-2" required />
              <label className="text-sm text-gray-600">
                I agree to the <a href="/terms" className="text-green-500 underline">Terms and Policies</a>
              </label>
            </div>

            <div className="flex space-x-4">
              <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">
                Sign up
              </button>
              <button type="button" className="border border-green-500 text-green-500 px-6 py-2 rounded-full hover:bg-green-500 hover:text-white">
                Already have an account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
