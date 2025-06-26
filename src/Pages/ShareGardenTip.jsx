import { useState } from "react";
import { toast } from "react-toastify";
const ShareGardenTip = ({ user }) => {
  if (!user) {
    return (
      <p className="text-center mt-5 text-gray-700 dark:text-gray-200">
        Please login to share a garden tip.
      </p>
    );
  }

  const [formData, setFormData] = useState({
    title: "",
    plantType: "",
    difficultyLevel: "Easy",
    description: "",
    imagesUrl: "",
    category: "Composting",
    availability: "Public",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      email: user?.email || "anonymous@example.com",
      name: user?.displayName || "Anonymous",
    };

    try {
      const response = await fetch("https://gardening-community.vercel.app/api/garden-tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Tip submitted successfully!");
        setFormData({
          title: "",
          plantType: "",
          difficultyLevel: "Easy",
          description: "",
          imagesUrl: "",
          category: "Composting",
          availability: "Public",
        });
      } else {
        alert("Failed to submit tip.");
      }
    } catch (error) {
      //console.error("Error submitting tip:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="max-w-xl w-[90%] mx-auto mt-8 p-6 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 shadow-md">
      <h2 className="text-xl font-semibold text-center text-green-700 dark:text-green-400 mb-6">
        ➕ Share a Garden Tip
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="How I Grow Tomatoes Indoors"
            required
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Plant Type/Topic:</label>
          <input
            type="text"
            name="plantType"
            value={formData.plantType}
            onChange={handleChange}
            placeholder="Tomato, Herbs, etc."
            required
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Difficulty Level:</label>
          <select
            name="difficultyLevel"
            value={formData.difficultyLevel}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="font-bold text-gray-700 dark:text-gray-300 block ">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write your detailed garden tip here..."
            rows={3}
            required
            className="w-full  border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-vertical"
          />
        </div>

        <div>
          <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Images URL:</label>
          <input
            type="url"
            name="imagesUrl"
            value={formData.imagesUrl}
            onChange={handleChange}
            placeholder="img url"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="Composting">Composting</option>
            <option value="Plant Care">Plant Care</option>
            <option value="Vertical Gardening">Vertical Gardening</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Availability:</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="Public">Public</option>
            <option value="Hidden">Hidden</option>
          </select>
        </div>

        <div>
          <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">User Email:</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">User Name:</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 mt-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded"
        >
          Submit Tip
        </button>
      </form>
    </div>
  );
};

export default ShareGardenTip;
