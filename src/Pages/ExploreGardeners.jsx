import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExploreGardeners() {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://gardening-community.vercel.app/gardeners')
      .then(res => {
        setGardeners(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Error fetching gardeners');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Loading gardeners...</p>;
  if (error) return <p className="text-center py-10 text-red-600">Error: {error}</p>;

  return (
     <div className="mt-20 bg-gray-100 py-10">
    <h2 className="text-center text-2xl font-bold mb-6">Explore Gardeners</h2>

    {gardeners.length === 0 ? (
      <p className="text-center text-gray-600">No gardeners found.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {gardeners.map((gardener) => (
          <div
            key={gardener._id}
            className="border rounded-lg bg-white shadow-md p-4 flex flex-col justify-between text-center"
          >
            <img
              src={gardener.image}
              alt={gardener.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{gardener.name}</h3>
            <p className="text-sm text-gray-600">Status: {gardener.status}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default ExploreGardeners;
