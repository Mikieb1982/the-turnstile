import React from 'react';

const Filters = () => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <div className="flex space-x-4">
        <input type="text" placeholder="Search..." className="bg-gray-700 p-2 rounded-lg w-full" />
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg">Search</button>
      </div>
    </div>
  );
};

export default Filters;
