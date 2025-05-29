import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyTips = ({ user }) => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch only the logged-in user's tips
  useEffect(() => {
    if (!user) return; // wait for user info
    
    setLoading(true);
    fetch(`http://localhost:3000/api/garden-tips?userId=${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch your tips');
        return res.json();
      })
      .then((data) => {
        setTips(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user]);

  // Delete tip handler
  const handleDelete = (tipId) => {
    const confirmed = window.confirm('Are you sure you want to delete this tip?');
    if (!confirmed) return;

    fetch(`http://localhost:3000/api/garden-tips/${tipId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete tip');
        // Remove deleted tip from state
        setTips((prevTips) => prevTips.filter((tip) => tip.id !== tipId && tip._id !== tipId));
      })
      .catch((err) => {
        alert(`Error: ${err.message}`);
      });
  };

  // Navigate to update tip page
  const handleUpdate = (tipId) => {
    navigate(`/update-tip/${tipId}`);
  };

  if (loading) return <p>Loading your tips...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>My Shared Garden Tips</h2>
      {tips.length === 0 ? (
        <p>You haven't shared any tips yet.</p>
      ) : (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '1rem',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid #ccc' }}>
              <th style={{ padding: '0.5rem' }}>Title</th>
              <th>Plant Type</th>
              <th>Difficulty</th>
              <th>Visibility</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tips.map((tip) => (
              <tr key={tip.id || tip._id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '0.5rem' }}>{tip.title}</td>
                <td>{tip.plantType}</td>
                <td>{tip.difficultyLevel}</td>
                <td>{tip.isPublic ? 'Public' : 'Private'}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(tip.id || tip._id)}
                    style={{ marginRight: 8, padding: '0.3rem 0.6rem' }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(tip.id || tip._id)}
                    style={{ padding: '0.3rem 0.6rem', backgroundColor: '#d9534f', color: 'white', border: 'none' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyTips;
