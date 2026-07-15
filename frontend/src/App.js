import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RecipesPage from "./components/RecipesPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login"; 
import Header from "./components/Header";
import Footer from "./components/Footer"; 
import TestAPI from "./components/TestAPI";
import BookmarkedRecipesPage from "./components/BookmarkedRecipesPage";
import BlogPage from "./components/BlogPage";
import BlogDetails from "./components/BlogDetails";

function App() {
  const location = useLocation();

  // List of routes where header and footer should not appear
  const excludedRoutes = ["/signup", "/login"];

  const isExcludedRoute = excludedRoutes.includes(location.pathname);

  return (
    <div className="bg-black text-white font-sans">
      {!isExcludedRoute && <Header />} {/* Render Header unless on excluded routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/test-api" element={<TestAPI />} />
        <Route path="/bookmarked-recipes" element={<BookmarkedRecipesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        {/* Add other routes as needed */}
      </Routes>
      {!isExcludedRoute && <Footer />} {/* Render Footer unless on excluded routes */}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
