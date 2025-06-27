import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/all-items`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched items:", data);
        setItems(data);
      })
      .catch((err) => {
        console.error("Error fetching my items:", err);
        setError("Failed to fetch items");
      });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Items</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border">
        <thead>
          <tr className="bg-green-100">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, idx) => (
              <tr key={item._id}>
                <td className="p-2 border">{idx + 1}</td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.category}</td>
                <td className="p-2 border">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-2 border text-center">
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyItems;
