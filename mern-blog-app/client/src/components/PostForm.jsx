import { useState } from 'react';
import { createPost } from '../services/api';
import { useNavigate } from 'react-router-dom';

const PostForm = ({ token }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    if (image) formData.append('image', image);

    await createPost(formData, token);
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-700">
          Create a New Post
        </h2>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Content</label>
          <textarea
            placeholder="Post Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 h-40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <input
            type="text"
            placeholder="Post Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border border-gray-300 rounded-md p-3"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
