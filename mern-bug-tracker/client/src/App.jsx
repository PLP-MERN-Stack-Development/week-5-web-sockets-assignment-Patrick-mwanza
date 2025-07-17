import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorBoundary from './components/ErrorBoundary';

const BugForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/bugs', { title, description });
      onAdd(res.data);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input
        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Bug title"
        required
      />
      <textarea
        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Bug description"
      />
      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
        Report Bug
      </button>
    </form>
  );
};

const BugList = ({ bugs, onUpdate, onDelete }) => (
  <ul className="space-y-4">
    {bugs.map((bug) => (
      <li
        key={bug._id}
        className="border border-gray-300 p-4 rounded shadow-md bg-white"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{bug.title}</h3>
          <button
            className="text-red-500 hover:text-red-700 text-sm"
            onClick={() => onDelete(bug._id)}
          >
            Delete
          </button>
        </div>
        <p className="text-sm text-gray-700">{bug.description}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-medium">Status:</span>
          <select
            className="border p-1 rounded"
            value={bug.status}
            onChange={(e) =>
              onUpdate(bug._id, { status: e.target.value })
            }
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </li>
    ))}
  </ul>
);

function App() {
  const [bugs, setBugs] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchBugs = async () => {
    try {
      const res = await axios.get('/api/bugs');
      setBugs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addBug = (bug) => setBugs([bug, ...bugs]);
  const updateBug = async (id, updates) => {
    const res = await axios.put(`/api/bugs/${id}`, updates);
    setBugs(bugs.map((b) => (b._id === id ? res.data : b)));
  };
  const deleteBug = async (id) => {
    await axios.delete(`/api/bugs/${id}`);
    setBugs(bugs.filter((b) => b._id !== id));
  };

  const filteredBugs = bugs.filter((bug) => {
    const matchesSearch = bug.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filter === 'all' || bug.status === filter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    fetchBugs();
  }, []);

  return (
    <ErrorBoundary>
      <div className="p-6 max-w-3xl mx-auto min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Bug Tracker</h1>
        <BugForm onAdd={addBug} />

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search bugs by title..."
            className="border p-2 rounded shadow w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border p-2 rounded shadow"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {filteredBugs.length === 0 ? (
          <p className="text-gray-500">No bugs found.</p>
        ) : (
          <BugList
            bugs={filteredBugs}
            onUpdate={updateBug}
            onDelete={deleteBug}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
