import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../redux/recipeSlice';

const socket = io('http://localhost:5000');

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recipes`).then((res) => {
      const found = res.data.find((r) => r._id === id);
      setRecipe(found);
    });
  }, [id]);

  useEffect(() => {
    socket.on('receiveComment', (comment) => {
      setComments((prev) => [...prev, comment]);
    });
    return () => socket.off('receiveComment');
  }, []);

  const handleAddComment = () => {
    const newComment = { recipe: id, content: commentText };
    socket.emit('newComment', newComment);
    setCommentText('');
  };

  if (!recipe) return <p>Loading recipe...</p>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-primary mb-4">{recipe.title}</h1>
      <img
        src={recipe.image || 'https://via.placeholder.com/600x300'}
        alt={recipe.title}
        className="w-full rounded-lg mb-4"
      />
      <button
        className="bg-primary text-white px-4 py-2 rounded mb-4"
        onClick={() => dispatch(addFavorite(recipe._id))}
      >
        ❤️ Save to Favorites
      </button>
      <h2 className="font-semibold text-xl mt-4 mb-2">Ingredients:</h2>
      <ul className="list-disc ml-6">
        {recipe.ingredients.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
      <h2 className="font-semibold text-xl mt-4 mb-2">Steps:</h2>
      <ol className="list-decimal ml-6">
        {recipe.steps.map((s, idx) => (
          <li key={idx}>{s}</li>
        ))}
      </ol>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Comments:</h2>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="border rounded p-2 w-full mb-2"
          placeholder="Write a comment..."
        />
        <button
          onClick={handleAddComment}
          className="bg-secondary text-red-800 px-4 py-2 rounded"
        >
          Post Comment
        </button>
        <ul className="mt-4">
          {comments.map((c, idx) => (
            <li key={idx} className="border-b py-2">{c.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecipeDetail;