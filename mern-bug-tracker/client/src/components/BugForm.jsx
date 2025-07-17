import React, { useState } from 'react';
import axios from 'axios';

const BugForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/bugs', { title, description });
    onAdd(res.data);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      <input
        className="border p-2 w-full rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Bug title"
        required
      />
      <textarea
        className="border p-2 w-full rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Bug description"
      />
      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
        Report Bug
      </button>
    </form>
  );
};

export default BugForm;