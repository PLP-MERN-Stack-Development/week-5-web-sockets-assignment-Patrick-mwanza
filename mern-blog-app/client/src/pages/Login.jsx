import { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = ({ saveToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ username, password });
    saveToken(res.data.token);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-700">
          Login to Your Account
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-3 rounded-md hover:bg-purple-700 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
