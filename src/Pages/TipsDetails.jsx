import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TipDetails = () => {
  const { id } = useParams();
  const [tip, setTip] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/garden-tips/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch tip details');
        return res.json();
      })
      .then(data => {
        setTip(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleLike = async () => {
    if (likeLoading) return; 
    setLikeLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/garden-tips/${id}/like`, {
        method: 'PATCH',
      });
      if (!response.ok) throw new Error('Failed to update like');

     
      setTip(prev => ({
        ...prev,
        totalLiked: (prev.totalLiked || 0) + 1,
      }));
    } catch (err) {
      alert(err.message);
    } finally {
      setLikeLoading(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!tip) return <p className="text-center">Tip not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">{tip.title}</h1>

      <img
        src={tip.imagesUrl || 'https://via.placeholder.com/600x300?text=No+Image'}
        alt={tip.title}
        className="w-full h-64 object-cover rounded mb-6"
      />

      <p><strong>Category:</strong> {tip.category}</p>
      <p><strong>Plant Type:</strong> {tip.plantType}</p>
      <p><strong>Difficulty Level:</strong> {tip.difficultyLevel}</p>
      <p className="mt-4"><strong>Description:</strong><br />{tip.description}</p>
      <p className="mt-4"><strong>Shared by:</strong> {tip.name} ({tip.email})</p>

      <p className="mt-4"><strong>Total Likes:</strong> {tip.totalLiked || 0}</p>

      <button
        onClick={handleLike}
        disabled={likeLoading}
        className={`mt-4 px-4 py-2 rounded text-white ${likeLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
      >
        👍 Like
      </button>
    </div>
  );
};

export default TipDetails;
