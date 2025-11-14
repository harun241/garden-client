import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.API_BASE_URL;

const AddItem = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/add-item`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Item added successfully");
        navigate("/dashboard/my-items");
      } else {
        alert(data.message || "Failed to add item");
      }
    } catch (err) {
      console.error("Error adding item:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          className="w-full p-2 border"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full p-2 border"
          value={form.category}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddItem;
