import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="border-t border-gray-700 max-w-6xl mx-auto px-6">
        {/* Upper Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700 pb-8 mb-8 mt-16 pb-24">
          {/* Logo and Description */}
          <div className="flex flex-col items-start">
            <img
              src="/images/logo.png" // Replace with the actual logo path
              alt="SwiftCuisine Logo"
              className="h-24 mb-4"
            />
            <p className="text-sm leading-relaxed max-w-md">
              Igniting Your Passion for Cooking with Instant Inspiration and
              Effortless Elegance, Because Your Culinary Journey Should Be as
              Swift as It is Delightful
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-6 mt-8 md:mt-0 md:ml-12">
            {/* About Section */}
            <div>
              <h3 className="text-green-400 font-semibold text-lg">About Dev</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link to="linkedin.com/in/mustafa-khawar-a3462a295" className="hover:text-green-400">
                    Linkedin
                  </Link>
                </li>
                <li>
                  <Link to="https://github.com/Musimanz" className="hover:text-green-400">
                    Github
                  </Link>
                </li>
              </ul>
            </div>

            {/* Terms Section */}
            <div>
              <h3 className="text-green-400 font-semibold text-lg">Useful Links</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link to="#terms" className="hover:text-green-400">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link to="#policy" className="hover:text-green-400">
                    Policy
                  </Link>
                </li>
                <li>
                  <Link to="/bookmarked-recipes" className="hover:text-green-400">
                    Bookmarks
                  </Link>
                </li>
              </ul>
            </div>

            {/* Recipe Section */}
            <div>
              <h3 className="text-green-400 font-semibold text-lg">Recipes</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link to="/recipes" className="hover:text-green-400">
                    Recipe Generator
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-green-400">
                    Recipe Blogs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lower Section */}
        <div className="text-center text-gray-500 text-sm">
          &copy; 2024{" "}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400"
          >
            SwiftCuisine
          </a>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
