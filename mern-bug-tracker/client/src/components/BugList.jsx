import React from 'react';

const BugList = ({ bugs, onUpdate, onDelete }) => (
  <ul className="space-y-4">
    {bugs.map((bug) => (
      <li
        key={bug._id}
        className="border border-gray-200 p-4 rounded-lg shadow-md bg-white"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{bug.title}</h3>
          <button
            className="text-red-500 hover:text-red-700 text-sm"
            onClick={() => onDelete(bug._id)}
          >
            Delete
          </button>
        </div>
        <p className="text-gray-600 mb-2">{bug.description}</p>
        <div className="flex items-center gap-4">
          <label className="text-sm">Status:</label>
          <select
            className="border p-1 rounded shadow"
            value={bug.status}
            onChange={(e) => onUpdate(bug._id, { status: e.target.value })}
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

export default BugList;