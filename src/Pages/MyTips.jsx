import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const MyTips = ({ user }) => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    setLoading(true);
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

  const handleDelete = async (tipId) => {
    const confirmed = window.confirm(
      "Are you absolutely sure you want to delete this garden tip? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/api/garden-tips/${tipId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete tip");

      setTips((prevTips) => prevTips.filter((tip) => tip._id !== tipId));
      toast.success("Tip deleted successfully!");
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  const handleUpdate = (tipId) => {
    navigate(`/update-tip/${tipId}`);
  };

  if (loading) return <p className="text-center py-10">Loading your tips...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-600">Error: {error}</p>
    );

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "2rem auto",
        fontFamily: "Arial, sans-serif",
        padding: "0 1rem",
      }}
    >
      <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
        My Shared Garden Tips
      </h2>

      {tips.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          You haven't shared any tips yet.
        </p>
      ) : (
        <div
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "1rem",
              textAlign: "left",
              minWidth: 600,
            }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid #ccc" }}>
                <th style={{ padding: "0.5rem" }}>Title</th>
                <th style={{ padding: "0.5rem" }}>Plant Type</th>
                <th style={{ padding: "0.5rem" }}>Difficulty</th>
                <th style={{ padding: "0.5rem" }}>Visibility</th>
                <th style={{ padding: "0.5rem", minWidth: "120px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tips.map((tip) => (
                <tr key={tip._id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "0.5rem", whiteSpace: "nowrap" }}>
                    {tip.title}
                  </td>
                  <td style={{ padding: "0.5rem", whiteSpace: "nowrap" }}>
                    {tip.plantType}
                  </td>
                  <td style={{ padding: "0.5rem", whiteSpace: "nowrap" }}>
                    {tip.difficultyLevel}
                  </td>
                  <td style={{ padding: "0.5rem", whiteSpace: "nowrap" }}>
                    {tip.isPublic ? "Public" : "Private"}
                  </td>
                  <td style={{ padding: "0.5rem", whiteSpace: "nowrap" }}>
                    <button
                      onClick={() => handleUpdate(tip._id)}
                      style={{
                        marginRight: 8,
                        padding: "0.3rem 0.8rem",
                        cursor: "pointer",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                      }}
                      aria-label={`Update tip titled ${tip.title}`}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(tip._id)}
                      style={{
                        padding: "0.3rem 0.8rem",
                        backgroundColor: "#d9534f",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: 4,
                      }}
                      aria-label={`Delete tip titled ${tip.title}`}
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
    </div>
  );
};

export default MyTips;
