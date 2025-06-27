import React, { useEffect, useState } from 'react';

const FeaturedGardeners = () => {
  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    fetch('https://gardening-community.vercel.app/gardeners/active')
      .then(res => res.json())
      .then(data => setGardeners(data))
    
  }, []);

  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-10 py-10 bg-gray-100 max-w-7xl mx-auto mt-20">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 text-green-800">
        🌿 Featured Gardeners
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gardeners.length > 0 ? (
          gardeners.map(gardener => (
            <div
              key={gardener._id}
              className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={gardener.image || '/placeholder.jpg'}
                alt={gardener.name || 'Gardener'}
                className="w-full h-48 sm:h-56 object-cover rounded-lg"
              />
              <h3 className="text-lg md:text-xl mt-3 font-semibold text-center text-green-700">
                {gardener.name}
              </h3>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No active gardeners found.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedGardeners;
