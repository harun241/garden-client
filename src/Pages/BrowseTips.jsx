import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All'); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://gardening-community.vercel.app/api/garden-tips')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tips');
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
  }, []);


  const publicTips = tips.filter((tip) => tip.isPublic);


  const filteredTips =
    difficultyFilter === 'All'
      ? publicTips
      : publicTips.filter(
          (tip) =>
            tip.difficultyLevel &&
            tip.difficultyLevel.toLowerCase() === difficultyFilter.toLowerCase()
        );

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        🌿 Public Garden Tips
      </h2>

    
      <div className="mb-4 text-center">
        <label htmlFor="difficultyFilter" className="mr-2 font-semibold">
          Filter by Difficulty:
        </label>
        <select
          id="difficultyFilter"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1"
        >
          <option value="All">All</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {filteredTips.length === 0 ? (
        <p className="text-center">No public tips found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-green-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Plant Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Image
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 border-b">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTips.map((tip) => (
                <tr key={tip._id} className="bg-white hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-800 border-b">{tip.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 border-b">{tip.plantType}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 border-b">{tip.difficultyLevel || 'Unknown'}</td>
                  <td className="px-6 py-4 border-b">
                    <img
                      src={tip.imagesUrl || 'https://via.placeholder.com/80x50?text=No+Image'}
                      alt={tip.title}
                      className="w-20 h-14 object-cover rounded shadow"
                    />
                  </td>
                  <td className="px-6 py-4 text-center border-b">
                    <button
                      onClick={() => navigate(`/tip/${tip._id}`)}
                      className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-800"
                    >
                      <Eye size={18} /> <span>See More</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BrowseTips;
