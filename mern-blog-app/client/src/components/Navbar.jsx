import { Link } from 'react-router-dom';

const Navbar = ({ token, logout }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 shadow-lg flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link to="/" className="font-semibold hover:text-gray-200 transition">
          Home
        </Link>
        {token && (
          <Link to="/create" className="font-semibold hover:text-gray-200 transition">
            Create Post
          </Link>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {token ? (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-700 hover:bg-gray-100 px-4 py-2 rounded-md font-semibold transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-700 hover:bg-gray-100 px-4 py-2 rounded-md font-semibold transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
