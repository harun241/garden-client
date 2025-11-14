import React, { useEffect, useState } from 'react';

const FeaturedGardeners = () => {
  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    fetch('https://gardening-community.vercel.app/gardeners/active')
      .then(res => res.json())
      .then(data => setGardeners(data));
  }, []);

  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-10 py-12 max-w-7xl mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-12
        text-green-500  transition-colors duration-300 dark:bg-transparent">
        🌿 Featured Gardeners
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {gardeners.length > 0 ? (
          gardeners.map((gardener) => (
            <div
              key={gardener._id}
              className="relative  dark:bg-gray-800 p-4 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
            >
              {/* Gardener Image */}
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={gardener.image || '/placeholder.jpg'}
                  alt={gardener.name || 'Gardener'}
                  className="w-full h-56 sm:h-64 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Gardener Name */}
              <h3 className="text-lg md:text-xl mt-4 font-semibold text-center
                 dark:text-green-200 transition-colors duration-300">
                {gardener.name}
              </h3>

              {/* Optional: Add short description or stats */}
              {gardener.bio && (
                <p className="text-sm mt-2 text-center text-gray-600 dark:text-gray-300">
                  {gardener.bio}
                </p>
              )}

              {/* Optional: Badge or icon overlay */}
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                Active
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
            No active gardeners found.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedGardeners;
