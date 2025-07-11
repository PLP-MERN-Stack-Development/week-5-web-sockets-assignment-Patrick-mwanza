import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await axios.get('http://localhost:5000/api/recipes');
        setRecipes(res.data);
      } catch (err) {
        setError('Failed to fetch recipes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-lg text-text">Loading recipes...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-4xl font-bold text-primary mb-6">🍲 Recipes</h1>
      {recipes.length === 0 ? (
        <p className="text-text">No recipes found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="p-4 bg-white rounded-lg shadow border hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/recipes/${recipe._id}`)}
            >
              <h2 className="text-xl font-semibold text-primary mb-2">{recipe.title}</h2>
              <p className="text-text truncate">{recipe.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
