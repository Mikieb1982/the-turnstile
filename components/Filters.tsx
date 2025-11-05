import React from 'react';

const Filters = () => {
  return (
    // Use bg-card, text-text-primary
    <div className="bg-card text-text-primary p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <div className="flex space-x-4">
        {/* Use bg-surface */}
        <input type="text" placeholder="Search..." className="bg-surface p-2 rounded-lg w-full" />
        {/* Use bg-primary, hover:bg-primary/80, and text-background for contrast */}
        <button className="bg-primary hover:bg-primary/80 text-background font-bold py-2 px-4 rounded-lg">Search</button>
      </div>
    </div>
  );
};

export default Filters;
