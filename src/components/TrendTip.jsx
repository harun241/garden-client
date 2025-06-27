import React, { useEffect, useState } from 'react';

const TrendTip = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://gardening-community.vercel.app/trending/tips')
      .then(res => res.json())
      .then(data => {
        //console.log(data); 
        setTips(data);
        setLoading(false);
      })
      .catch(error => {
       // console.error('Error fetching trending tips:', error);
        setTips([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading trending tips...</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Top Trending Tips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tips.map(tip => (
          <div key={tip.id} className="border rounded-lg shadow p-4 bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold">{tip.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{tip.description}</p>
            <div className="text-sm text-gray-500 mt-2">
              <span>Category: {tip.category}</span> | <span>❤️ {tip.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendTip;
