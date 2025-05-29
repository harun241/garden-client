import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExploreGardeners() {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/gardeners')
      .then(res => {
        setGardeners(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Error fetching gardeners');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading gardeners...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      className="gardeners-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',  // ৫ কলাম সমান width
        gap: '1rem',
      }}
    >
      {gardeners.length === 0 && <p>No gardeners found.</p>}
      {gardeners.map(gardener => (
        <div
          key={gardener._id}
          className="gardener-card"
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <img
            src={gardener.image}
            alt={gardener.name}
            style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <h3>{gardener.name}</h3>
          <p>Status: {gardener.status}</p>
        </div>
      ))}
    </div>
  );
}

export default ExploreGardeners;
