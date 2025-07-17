import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Loading from '../common/Loading';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Product not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success('Product added to cart!');
  };

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-lg text-gray-600 mt-2">{product.brand}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FiStar className="text-yellow-400 fill-current" />
              <span className="ml-1 text-gray-600">
                {product.rating} ({product.numReviews} reviews)
              </span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">Category: {product.category}</span>
          </div>

          <div className="text-4xl font-bold text-primary-600">
            ${product.price}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="input-field w-20"
              >
                {Array.from({ length: Math.min(product.countInStock, 10) }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-sm text-gray-600">
                {product.countInStock > 0 
                  ? `${product.countInStock} in stock` 
                  : 'Out of stock'
                }
              </p>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className="btn-primary flex items-center space-x-2 text-lg px-8 py-3 disabled:opacity-50"
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
        
        {product.reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
        ) : (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review._id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{review.name}</span>
                    <div className="flex items-center">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <FiStar key={i} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
