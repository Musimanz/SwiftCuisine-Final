import React from "react";
import { Link} from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-black text-white font-sans">


      {/* Banner Section */}
      <header className="relative mx-16 mt-6 rounded-3xl overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-700 opacity-70"></div>
        
        {/* Background Image */}
        <img
            src="/images/banner-image.jpg" // Replace with your banner image path
            alt="Background"
            className="w-full h-[300px] object-cover"
        />
        
        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col justify-end items-start text-white px-12 pb-8">
            {/* Left Content */}
            <div className="space-y-4 max-w-xl">
            <h1 className="text-4xl font-bold">Recipe Generator</h1>
            <p className="text-lg leading-relaxed">
                No more last-minute grocery store runs or frantic searches for recipe
                inspiration. Our automated system streamlines the entire cooking process,
                providing step-by-step instructions.
            </p>
            </div>
            {/* Right Content */}
            <div className="absolute right-8 bottom-8 text-right">
            <p className="text-2xl font-bold">Innovate Your Plate</p>
            </div>
        </div>
        </header>


      {/* Call-to-Action Section */}
      <section className="px-8 py-12 bg-black text-center">
        <div className="flex justify-center mb-6">
          <span className="text-green-500 text-4xl font-bold">↓</span>
        </div>
        <p className="text-xl font-semibold mb-6 px-4 max-w-4xl mx-auto">
          Welcome to SwiftCuisine, where we redefine the art of cooking through
          our state-of-the-art automated recipe generator. Immerse yourself in
          a world where technology seamlessly blends with gastronomy, delivering
          a sophisticated and personalized culinary experience.
        </p>
        <Link to="/recipes">
          <button className="mt-8 bg-green-500 hover:bg-green-600 text-black text-lg font-bold px-8 py-3 rounded-full flex items-center mx-auto">
            Let’s Generate Recipe
            <span className="ml-2">→</span>
          </button>
        </Link>
        <p className="text-gray-400 mt-6">
          Turn your ingredients into delicious recipes <br />
          Examples: Cheeseburger with bacon, Pizza Margherita, ...
        </p>
      </section>



      {/* Popular Reads Section */}
      <section className="py-12 text-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/swift-bg.jpg')" }}>
        <h2 className="text-4xl font-bold text-green-500 mb-8">Popular Reads</h2>
        <div className="py-6 flex justify-center space-x-[8rem]">
          
          {/* Blog Post 1 */}
          <Link to="/blog/67a561550f2a68d280466b5f" className="relative rounded-xl overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105">
            <img
              src="/images/blog1.jpg" // Replace with your image path
              alt="Pancakes with syrup"
              className="w-80 h-128 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-xl font-bold">Pancakes</p>
            </div>
          </Link>

          {/* Blog Post 2 */}
          <Link to="/blog/67a562a60f2a68d280466b6b" className="relative rounded-xl overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105">
            <img
              src="/images/blog2.jpg" // Replace with your image path
              alt="Grilled food platter"
              className="w-80 h-128 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-xl font-bold">Grilled Platter</p>
            </div>
          </Link>

          {/* Blog Post 3 */}
          <Link to="/blog/67a563640f2a68d280466b73" className="relative rounded-xl overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105">
            <img
              src="/images/blog3.jpg" // Replace with your image path
              alt="Raspberry cake"
              className="w-80 h-128 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-xl font-bold">Raspberry Cake</p>
            </div>
          </Link>

        </div>
      </section>



      <div className="bg-black text-white px-[21rem] py-16">
      {/* Section Title */}
      <h2 className="text-center text-3xl font-bold text-green-400 mb-12">
        Discover the best free recipe generator
      </h2>

      {/* Cards Section */}
      <div className="flex flex-col space-y-8">
        {/* Card 1 */}
        <div className="flex flex-col md:flex-row items-center bg-[#001c1b] rounded-3xl p-8 md:space-x-8">
          <img
            src="/images/save-food.jpg" // Replace with actual image path
            alt="Save Food"
            className="w-60 h-60 rounded-lg object-cover"
          />
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <h3 className="text-green-400 text-2xl font-bold mb-2">Save Food</h3>
            <p className="text-lg">
              Encourage users to save ingredients they have in stock. This can
              involve a digital inventory system where users add items to their
              virtual kitchen and freezer.
            </p>
          </div>
        </div>

        {/* Card 2 (Image on the Right) */}
        <div className="flex flex-col md:flex-row-reverse items-center bg-[#001c1b] rounded-3xl p-8 md:space-x-8 md:space-x-reverse">
          <img
            src="/images/save-time.jpg" // Replace with actual image path
            alt="Save Time"
            className="w-60 h-60 rounded-lg object-cover"
          />
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <h3 className="text-green-400 text-2xl font-bold mb-2">Save Time</h3>
            <p className="text-lg">
              Recognizing the fast-paced nature of modern life, SwiftCuisine provides
              instant recipe inspiration, eliminating the time-consuming process of
              searching through cookbooks or websites.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col md:flex-row items-center bg-[#001c1b] rounded-3xl p-8 md:space-x-8">
          <img
            src="/images/meal-planning.jpg" // Replace with actual image path
            alt="Simplify Meal Planning"
            className="w-60 h-60 rounded-lg object-cover"
          />
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <h3 className="text-green-400 text-2xl font-bold mb-2">
              Simplify Meal Planning
            </h3>
            <p className="text-lg">
              SwiftCuisine understands that deciding what to cook can be a daily
              challenge. The motive is to simplify meal planning by instantly
              generating personalized recipes based on individual preferences and
              constraints.
            </p>
          </div>
        </div>
      </div>
      </div>





    </div>
  );
};

export default LandingPage;
