// src/pages/BrowseTips.jsx

import { useEffect, useState } from 'react';

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL; // 🔗 .env থেকে নিচ্ছে

  useEffect(() => {
    fetch(`${API_URL}/tips`)
      .then(res => res.json())
      .then(data => setTips(data));
  }, []);

  return (
    <div>
      <h2>Public Garden Tips</h2>
      <ul>
        {tips.map((tip) => (
          <li key={tip._id}>
            <strong>{tip.title}</strong> - {tip.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrowseTips;
