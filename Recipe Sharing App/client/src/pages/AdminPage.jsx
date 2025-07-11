import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/recipes').then((res) => {
      setRecipes(res.data.filter((r) => !r.isApproved));
    });
  }, []);

  const handleApprove = (id) => {
    axios.put(`http://localhost:5000/api/recipes/${id}/approve`, {}, {
      headers: { Authorization: localStorage.getItem('token') },
    }).then(() => {
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-primary mb-4">Admin Recipe Approval</h1>
      {recipes.map((recipe) => (
        <div key={recipe._id} className="border p-4 rounded mb-4">
          <h2 className="text-xl font-semibold">{recipe.title}</h2>
          <p>Category: {recipe.category}</p>
          <button
            onClick={() => handleApprove(recipe._id)}
            className="mt-2 bg-primary text-white px-4 py-2 rounded"
          >
            Approve Recipe
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;