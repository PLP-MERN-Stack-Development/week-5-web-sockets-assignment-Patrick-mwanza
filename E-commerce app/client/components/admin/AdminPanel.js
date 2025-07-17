import React from 'react';
import ProductManagement from './ProductManagement';
import UserManagement from './UserManagement';
import OrderManagement from './OrderManagement';

const AdminPanel = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <ProductManagement />
      <UserManagement />
      <OrderManagement />
    </div>
  );
};

export default AdminPanel;
