import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("None");

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


  // -------- SEARCH + FILTER --------
  const filteredTips = publicTips
    .filter(tip =>
      difficultyFilter === "All"
        ? true
        : tip.difficultyLevel?.toLowerCase() === difficultyFilter.toLowerCase()
    )
    .filter(tip =>
      tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.plantType.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // -------- SORTING --------
  const sortedTips = [...filteredTips].sort((a, b) => {
    if (sortOrder === "Alphabetical") {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === "EasyToHard") {
      const levels = { Easy: 1, Moderate: 2, Hard: 3 };
      return levels[a.difficultyLevel] - levels[b.difficultyLevel];
    }
    return 0;
  });

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto mt-20">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        🌿 Public Garden Tips
      </h2>


      {/* ----------- SUMMARY CARDS ----------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-100 p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-green-800">Total Tips</h3>
          <p className="text-2xl font-bold">{publicTips.length}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-blue-800">Easy Tips</h3>
          <p className="text-2xl font-bold">{publicTips.filter(t => t.difficultyLevel === "Easy").length}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-red-800">Hard Tips</h3>
          <p className="text-2xl font-bold">{publicTips.filter(t => t.difficultyLevel === "Hard").length}</p>
        </div>
      </div>


      {/* ----------- SEARCH & SORT ----------- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search by title or plant type..."
          className="border border-gray-300 px-4 py-2 rounded-lg w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sort */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-3 py-2 rounded bg-gray-100"
        >
          <option value="None">Sort By</option>
          <option value="Alphabetical">A-Z Title</option>
          <option value="EasyToHard">Difficulty (Easy → Hard)</option>
        </select>

        {/* Difficulty Filter */}
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="border px-3 py-2 rounded bg-green-100"
        >
          <option value="All">All</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Hard">Hard</option>
        </select>
      </div>


      {/* ------------ TABLE ------------ */}
      {sortedTips.length === 0 ? (
        <p className="text-center">No tips found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-green-100">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Plant</th>
                <th className="px-6 py-3 text-left">Difficulty</th>
                <th className="px-6 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedTips.map((tip) => (
                <tr key={tip._id} className="bg-white hover:bg-gray-50">
                  <td className="px-6 py-4">{tip.title}</td>
                  <td className="px-6 py-4">{tip.plantType}</td>
                  <td className="px-6 py-4">{tip.difficultyLevel ?? "Unknown"}</td>
                  <td className="px-6 py-4">
                    <img
                      src={tip.imagesUrl || 'https://via.placeholder.com/80x50?text=No+Image'}
                      className="w-20 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => navigate(`/tip/${tip._id}`)}
                      className="inline-flex items-center gap-1 text-green-600 hover:text-green-800"
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


      {/* ----------- FEATURED SECTION ----------- */}
      <h3 className="text-2xl font-bold mt-12 mb-4 text-green-700">⭐ Featured Tips</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {publicTips.slice(0, 3).map((tip) => (
          <div key={tip._id} className="bg-white rounded-lg shadow p-4">
            <img
              src={tip.imagesUrl || "https://via.placeholder.com/300"}
              className="w-full h-40 object-cover rounded"
            />
            <h4 className="text-lg font-semibold mt-2">{tip.title}</h4>
            <p className="text-sm text-gray-500">{tip.plantType}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default BrowseTips;
