import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Product added to cart!');
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-primary-600">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <FiStar className="text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">
              {product.rating} ({product.numReviews} reviews)
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            ${product.price}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50"
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
        
        {product.countInStock === 0 && (
          <p className="text-red-500 text-sm mt-2">Out of Stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;