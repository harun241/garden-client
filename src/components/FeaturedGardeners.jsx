import React, { useEffect, useState } from 'react';

const FeaturedGardeners = () => {
  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/gardeners/active')  // backend API URL
      .then(res => res.json())
      .then(data => setGardeners(data))
      .catch(err => console.error('Error fetching gardeners:', err));
  }, []);

  return (
    <section className="p-6 bg-green-50 max-w-7xl mx-auto my-20">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-800">🌿 Featured Gardeners</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gardeners.length > 0 ? (
          gardeners.map(gardener => (
            <div key={gardener._id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
              <img
                src={gardener.image}
                alt={gardener.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl mt-3 font-semibold text-center text-green-700">
                {gardener.name}
              </h3>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No active gardeners found.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedGardeners;

