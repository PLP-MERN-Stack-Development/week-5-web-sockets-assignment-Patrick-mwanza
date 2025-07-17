import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

const Cart = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return <p className="text-center text-lg">Your cart is empty.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ul className="space-y-4">
        {cartItems.map(item => (
          <CartItem key={item._id} item={item} />
        ))}
      </ul>
      <div className="mt-6 text-right">
        <p className="text-xl font-semibold">Total: ${getCartTotal().toFixed(2)}</p>
        <button onClick={clearCart} className="btn-secondary mt-2">Clear Cart</button>
        <Link to="/checkout" className="btn-primary ml-4">Proceed to Checkout</Link>
      </div>
    </div>
  );
};

export default Cart;
