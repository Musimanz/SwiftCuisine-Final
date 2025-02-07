import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-black text-white">
      <nav className="flex justify-between items-center px-12 py-4 border-b border-gray-800">
        <div>
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="SwiftCuisine Logo"
            className="h-20 w-auto"
          />
          </Link>
        </div>
        <ul className="flex space-x-8">
          <li
            className={`text-lg font-regular hover:text-green-400 cursor-pointer ${
              location.pathname === "/" ? "underline decoration-green-500 decoration-2 underline-offset-8" : ""
            }`}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className={`text-lg font-regular hover:text-green-400 cursor-pointer ${
              location.pathname === "/recipes" ? "underline decoration-green-500 decoration-2 underline-offset-8" : ""
            }`}
          >
            <Link to="/recipes">Recipes</Link>
          </li>
          <li
            className={`text-lg font-regular hover:text-green-400 cursor-pointer ${
              location.pathname === "/bookmarked-recipes" ? "underline decoration-green-500 decoration-2 underline-offset-8" : ""
            }`}
          >
            <Link to="/bookmarked-recipes">Bookmarks</Link>
          </li>
          <li
            className={`text-lg font-regular hover:text-green-400 cursor-pointer ${
              location.pathname === "/blog" ? "underline decoration-green-500 decoration-2 underline-offset-8" : ""
            }`}
          >
            <Link to="/blog">Blog</Link>
          </li>
          
        </ul>
        <div className="flex space-x-4">
          <Link to="/signup">
            <button className="px-4 py-2 text-base font-regular border-2 border-green-500 rounded-full hover:bg-green-500 hover:text-black">
              Sign up
            </button>
          </Link>
          <Link to="/login">
            <button className="px-4 py-2 text-base font-regular border-2 border-green-500 rounded-full hover:bg-green-500 hover:text-black">
              Log in
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
