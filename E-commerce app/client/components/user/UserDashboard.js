import React from 'react';
import OrderHistory from './OrderHistory';

const UserDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <OrderHistory />
    </div>
  );
};

export default UserDashboard;
