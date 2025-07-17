import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Simulate payment
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/dashboard');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cartItems.map(item => (
        <div key={item._id} className="mb-4 border-b pb-2">
          {item.name} x {item.quantity} = ${(item.quantity * item.price).toFixed(2)}
        </div>
      ))}
      <div className="text-right mt-4">
        <p className="text-xl font-semibold">Total: ${getCartTotal().toFixed(2)}</p>
        <button onClick={handleCheckout} className="btn-primary mt-4">Place Order</button>
      </div>
    </div>
  );
};

export default Checkout;
