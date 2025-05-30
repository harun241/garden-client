import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/garden-tips')
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

  if (loading)
    return <p className="text-center text-lg text-green-700 py-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 font-semibold py-10">{error}</p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        🌿 Public Garden Tips
      </h2>

      {publicTips.length === 0 ? (
        <p className="text-center text-gray-600">No public tips found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full min-w-[600px] border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-green-100">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-semibold text-gray-700 border-b">
                  Title
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-semibold text-gray-700 border-b">
                  Plant Type
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-semibold text-gray-700 border-b">
                  Image
                </th>
                <th className="px-4 sm:px-6 py-3 text-center text-sm sm:text-base font-semibold text-gray-700 border-b">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {publicTips.map((tip) => (
                <tr
                  key={tip._id}
                  className="bg-white hover:bg-gray-50 transition"
                >
                  <td className="px-4 sm:px-6 py-3 text-sm sm:text-base text-gray-800 border-b">
                    {tip.title}
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-sm sm:text-base text-gray-800 border-b">
                    {tip.plantType}
                  </td>
                  <td className="px-4 sm:px-6 py-3 border-b">
                    <img
                      src={
                        tip.imagesUrl ||
                        'https://via.placeholder.com/80x50?text=No+Image'
                      }
                      alt={tip.title}
                      className="w-20 h-14 object-cover rounded shadow"
                    />
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-center border-b">
                    <button
                      onClick={() => navigate(`/tip/${tip._id}`)}
                      className="inline-flex items-center gap-1 text-sm sm:text-base text-green-600 hover:text-green-800"
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
