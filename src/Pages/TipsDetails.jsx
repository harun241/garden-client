import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const TipDetails = () => {
  const { id } = useParams();
  const [tip, setTip] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    fetch(`https://gardening-community.vercel.app/api/garden-tips/${id}`)
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
    if (likeLoading || !tip) return;

    // Optimistically update the UI
    setTip(prev => ({
      ...prev,
      totalLiked: (prev.totalLiked || 0) + 1,
    }));
    setLikeLoading(true);

    try {
      const response = await fetch(`https://gardening-community.vercel.app/api/garden-tips/${id}/like`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        // Rollback if failed
        setTip(prev => ({
          ...prev,
          totalLiked: (prev.totalLiked || 1) - 1,
        }));
        throw new Error('Failed to update like');
      }

      toast.success("Thanks for liking!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLikeLoading(false);
    }
  };

  if (loading) return <p className="text-center py-6 text-base">Loading...</p>;
  if (error) return <p className="text-center text-red-600 py-6">{error}</p>;
  if (!tip) return <p className="text-center py-6">Tip not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">{tip.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left - Image */}
        <div className="w-full h-64 md:h-full">
          <img
            src={tip.imagesUrl || 'https://via.placeholder.com/500x300?text=No+Image'}
            alt={tip.title}
            className="w-full h-full object-cover rounded-md shadow-md"
          />
        </div>

        {/* Right - Text */}
        <div className="flex flex-col justify-between h-full text-gray-800 dark:text-gray-100 space-y-4">
          <div className="space-y-2 text-sm sm:text-base">
            <p><span className="font-semibold">🌿 Category:</span> {tip.category}</p>
            <p><span className="font-semibold">🪴 Plant Type:</span> {tip.plantType}</p>
            <p><span className="font-semibold">⚙️ Difficulty:</span> {tip.difficultyLevel}</p>
            <p><span className="font-semibold">🔒 Visibility:</span> {tip.isPublic ? 'Public' : 'Private'}</p>
            <p className="leading-relaxed">
              <span className="font-semibold">📝 Description:</span><br />
              {tip.description}
            </p>
          </div>

          <div className="text-xs text-gray-600 dark:text-gray-300">
            <p>👤 Shared by: <span className="font-semibold">{tip.name}</span> ({tip.email})</p>
            <p>❤️ Total Likes: <span className="font-semibold">{tip.totalLiked || 0}</span></p>
          </div>

          <div className="mt-3">
            <button
              onClick={handleLike}
              disabled={likeLoading}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full transition-colors text-white text-sm font-semibold shadow-md
                ${likeLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 active:scale-95'}`}
            >
              👍 {likeLoading ? 'Liking...' : 'Like This Tip'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipDetails;
