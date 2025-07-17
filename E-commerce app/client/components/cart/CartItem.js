import React from 'react';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <li className="flex items-center justify-between border p-4 rounded">
      <div>
        <h4 className="font-semibold">{item.name}</h4>
        <p>${item.price.toFixed(2)} x {item.quantity}</p>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
          className="w-16 border px-2 py-1 rounded"
        />
        <button
          onClick={() => removeFromCart(item._id)}
          className="text-red-600 hover:underline"
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartItem;
