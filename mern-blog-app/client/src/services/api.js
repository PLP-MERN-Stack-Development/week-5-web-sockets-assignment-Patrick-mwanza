import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api', // Uses VITE_API_URL from .env
});

// ✅ Auth APIs
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);

// ✅ Posts APIs
export const getPosts = () => api.get('/posts');
export const getPost = (id) => api.get(`/posts/${id}`);
export const createPost = (data, token) => api.post('/posts', data, {
  headers: { Authorization: `Bearer ${token}` },
});
export const updatePost = (id, data, token) => api.put(`/posts/${id}`, data, {
  headers: { Authorization: `Bearer ${token}` },
});
export const deletePost = (id, token) => api.delete(`/posts/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});

// ✅ Categories APIs
export const getCategories = () => api.get('/categories');
export const createCategory = (data, token) => api.post('/categories', data, {
  headers: { Authorization: `Bearer ${token}` },
});
