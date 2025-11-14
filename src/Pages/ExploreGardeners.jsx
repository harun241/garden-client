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

  if (loading) 
    return <p className="text-center py-10 text-green-600 dark:text-green-300">Loading gardeners...</p>;
  
  if (error) 
    return <p className="text-center py-10 text-red-600">Error: {error}</p>;

  return (
    <div className="mt-20 py-10 px-4 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-10 
        text-green-600 dark:text-green-300 transition-colors duration-300">
        🌿 Explore Gardeners
      </h2>

      {gardeners.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No gardeners found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {gardeners.map((gardener) => (
            <div
              key={gardener._id}
              className=" dark:bg-gray-800 rounded-3xl shadow-lg p-4 flex flex-col items-center 
                         transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-2xl"
            >
              {/* Gardener Image */}
              <div className="w-full overflow-hidden rounded-2xl mb-4">
                <img
                  src={gardener.image || '/placeholder.jpg'}
                  alt={gardener.name || 'Gardener'}
                  className="w-full h-48 sm:h-52 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Gardener Name */}
              <h3 className="text-lg sm:text-xl font-semibold  dark:text-gray-200 mb-1">
                {gardener.name}
              </h3>

              {/* Status */}
              <p className="text-sm  dark:text-gray-300 mb-2">
                Status: {gardener.status || 'N/A'}
              </p>

              {/* Optional: Action Button */}
              <button className="mt-2 px-4 py-1 bg-green-500  dark:bg-green-500 text-gray-100 
                                 rounded-full text-sm font-medium hover:bg-green-700 dark:hover:bg-green-600 
                                 transition-colors duration-300">
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExploreGardeners;
