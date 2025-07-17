// client/src/pages/Home.jsx
import React from 'react';
import ProductList from "../../components/products/ProductList";



const Home = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20 mb-8 rounded-lg">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to E-Shop
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover amazing products at unbeatable prices
          </p>
          <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </div>

      <ProductList />
    </div>
  );
};

export default Home;
