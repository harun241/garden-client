// src/dashboard/AllItems.jsx
import { useEffect, useState } from "react";

const AllItems = () => {
  const [items, setItems] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`https://gardening-community.vercel.app/api/all-items `)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, [BASE_URL]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Items</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-green-100">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Owner</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, idx) => (
              <tr key={item._id}>
                <td className="p-2 border">{idx + 1}</td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.category || "N/A"}</td>
                <td className="p-2 border">{item.ownerEmail || "Unknown"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllItems;
