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

  if (loading) return <p className="text-center py-10 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;
  if (!tip) return <p className="text-center py-10">Tip not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-white shadow-2xl rounded-xl mt-10">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-green-700">
        {tip.title}
      </h1>

      <img
        src={tip.imagesUrl || 'https://via.placeholder.com/600x300?text=No+Image'}
        alt={tip.title}
        className="w-full h-72 sm:h-96 object-cover rounded-lg mb-6"
      />

      <div className="grid sm:grid-cols-2 gap-6 text-gray-700 text-lg">
        <p><span className="font-semibold">🌿 Category:</span> {tip.category}</p>
        <p><span className="font-semibold">🪴 Plant Type:</span> {tip.plantType}</p>
        <p><span className="font-semibold">⚙️ Difficulty:</span> {tip.difficultyLevel}</p>
        <p><span className="font-semibold">🔒 Visibility:</span> {tip.isPublic ? 'Public' : 'Private'}</p>
      </div>

      <div className="mt-6">
        <p className="text-gray-800 text-lg leading-relaxed">
          <span className="font-semibold">📝 Description:</span><br />
          {tip.description}
        </p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
        <p><span className="font-semibold">👤 Shared by:</span> {tip.name} ({tip.email})</p>
        <p className="mt-2 sm:mt-0">
          <span className="font-semibold">❤️ Total Likes:</span> {tip.totalLiked || 0}
        </p>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleLike}
          disabled={likeLoading}
          className={`inline-flex items-center gap-2 px-6 py-2 rounded-full transition-all text-white text-lg font-medium shadow-md
            ${likeLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 active:scale-95'}`}
        >
          👍 Like This Tip
        </button>
      </div>
    </div>
  );
};

export default TipDetails;
