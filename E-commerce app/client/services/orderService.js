import api from './api';

export const createOrder = (orderData) => {
  return api.post('/orders', orderData);
};

export const getUserOrders = () => {
  return api.get('/orders/my');
};

export const getAllOrders = () => {
  return api.get('/orders');
};

export const updateOrderStatus = (orderId, status) => {
  return api.put(`/orders/${orderId}`, { status });
};

export const getOrderById = (id) => {
  return api.get(`/orders/${id}`);
};
