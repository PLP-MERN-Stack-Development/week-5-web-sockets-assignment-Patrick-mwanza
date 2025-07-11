import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="text-center p-16 bg-[#FFF8F0] min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold text-[#FF6B6B] mb-6">
        🍳 Recipe Sharing App
      </h1>
      <p className="text-xl text-[#333] mb-8">
        Discover & Share Delicious Recipes from Around the World
      </p>

      {/* ✅ Login & Register buttons */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => navigate('/login')}
          className="bg-[#FF7F50] text-white px-6 py-3 font-semibold rounded-full shadow hover:bg-[#FF6347] transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="bg-[#FEC260] text-white px-6 py-3 font-semibold rounded-full shadow hover:bg-[#F7B731] transition"
        >
          Register
        </button>
      </div>

      {/* ✅ Get Started button */}
      <button
        onClick={() => navigate('/recipes')}
        className="bg-[#6BCB77] text-white px-8 py-4 font-semibold rounded-full shadow-lg hover:bg-[#4CAF50] transition"
      >
        🍲 Get Started
      </button>
    </div>
  );
}
