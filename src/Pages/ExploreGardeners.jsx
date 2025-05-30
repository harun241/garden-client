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
    <div
      className="gardeners-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        padding: '1rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {gardeners.length === 0 && <p className="text-center col-span-full">No gardeners found.</p>}
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
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <img
            src={gardener.image}
            alt={gardener.name}
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '0.75rem',
            }}
          />
          <h3 style={{ margin: '0.5rem 0', fontSize: '1.25rem', color: '#2c3e50' }}>{gardener.name}</h3>
          <p style={{ color: '#555', fontSize: '1rem' }}>Status: {gardener.status}</p>
        </div>
      ))}
    </div>
  );
}

export default ExploreGardeners;
