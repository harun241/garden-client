import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const MyTips = ({ user }) => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/api/garden-tips?email=${user.email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch your tips");
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

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/garden-tips/${deleteTarget._id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete tip");

      setTips((prevTips) => prevTips.filter((tip) => tip._id !== deleteTarget._id));
      toast.success("Tip deleted successfully!");
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleUpdate = (tipId) => {
    navigate(`/update-tip/${tipId}`);
  };

  if (loading) return <p className="text-center py-10">Loading your tips...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-600 dark:text-red-400">
        Error: {error}
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
        My Shared Garden Tips
      </h2>

      {tips.length === 0 ? (
        <p className="text-center dark:text-gray-300">
          You haven't shared any tips yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm text-left dark:text-gray-200">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700">
                <th className="p-3">Title</th>
                <th className="p-3">Plant Type</th>
                <th className="p-3">Difficulty</th>
                <th className="p-3">Visibility</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tips.map((tip) => (
                <tr
                  key={tip._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white transition-colors duration-200"
                >
                  <td className="p-3">{tip.title}</td>
                  <td className="p-3">{tip.plantType}</td>
                  <td className="p-3">{tip.difficultyLevel}</td>
                  <td className="p-3">
                    {tip.isPublic ? "Public" : "Private"}
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleUpdate(tip._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setDeleteTarget(tip)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-xl w-[90%] max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
              Confirm Deletion
            </h3>
            <p className="dark:text-gray-200">
              Are you sure you want to delete the tip:{" "}
              <strong>{deleteTarget.title}</strong>?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTips;
