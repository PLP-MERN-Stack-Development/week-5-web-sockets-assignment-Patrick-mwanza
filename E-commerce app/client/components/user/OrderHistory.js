import React from 'react';

const OrderHistory = () => {
  // Replace this with actual order fetching logic later
  const orders = [];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Order History</h3>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order, index) => (
            <li key={index} className="border p-4 rounded-lg shadow">
              Order #{order.id} - {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
