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

  if (loading) return <p className="text-center py-6 text-base">Loading...</p>;
  if (error) return <p className="text-center text-red-600 py-6">{error}</p>;
  if (!tip) return <p className="text-center py-6">Tip not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-slate-100 shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-green-700">{tip.title}</h1>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Left side: smaller image */}
        <div className="sm:w-1/3 flex-shrink-0">
          <img
            src={tip.imagesUrl || 'https://via.placeholder.com/400x250?text=No+Image'}
            alt={tip.title}
            className="w-full h-auto rounded-md shadow-md object-cover"
          />
        </div>

        {/* Right side: Details */}
        <div className="sm:w-2/3 flex flex-col justify-between">
          <div className="text-gray-700 text-sm sm:text-base space-y-2">
            <p><span className="font-semibold">🌿 Category:</span> {tip.category}</p>
            <p><span className="font-semibold">🪴 Plant Type:</span> {tip.plantType}</p>
            <p><span className="font-semibold">⚙️ Difficulty:</span> {tip.difficultyLevel}</p>
            <p><span className="font-semibold">🔒 Visibility:</span> {tip.isPublic ? 'Public' : 'Private'}</p>

            <p className="mt-3 leading-relaxed">
              <span className="font-semibold">📝 Description:</span><br />
              {tip.description}
            </p>

            <p className="mt-4 text-xs text-gray-600">
              👤 Shared by: <span className="font-semibold">{tip.name}</span> ({tip.email})
            </p>
            <p className="text-xs text-gray-600">❤️ Total Likes: <span className="font-semibold">{tip.totalLiked || 0}</span></p>
          </div>

          <div className="mt-4 sm:mt-6 text-left">
            <button
              onClick={handleLike}
              disabled={likeLoading}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full transition-colors text-white text-sm font-semibold shadow-md
                ${likeLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 active:scale-95'}`}
            >
              👍 Like This Tip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipDetails;
