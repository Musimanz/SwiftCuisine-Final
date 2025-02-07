import React from "react";

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
              <h3 className="text-green-400 font-semibold text-lg">About</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="/login" className="hover:text-green-400">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-green-400">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Terms Section */}
            <div>
              <h3 className="text-green-400 font-semibold text-lg">Terms</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#terms" className="hover:text-green-400">
                    Of Use
                  </a>
                </li>
                <li>
                  <a href="#policy" className="hover:text-green-400">
                    Policy
                  </a>
                </li>
                <li>
                  <a href="#reads" className="hover:text-green-400">
                    Reads
                  </a>
                </li>
              </ul>
            </div>

            {/* Recipe Section */}
            <div>
              <h3 className="text-green-400 font-semibold text-lg">Recipe</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="/recipes" className="hover:text-green-400">
                    Recipe Generator
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-green-400">
                    Recipe Read
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-green-400">
                    Recipe Blogs
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lower Section */}
        <div className="text-center text-gray-500 text-sm">
          &copy; 2024{" "}
          <a
            href="https://janpoth.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400"
          >
            Jan Poth
          </a>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
