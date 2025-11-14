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
      const response = await fetch(
        "https://gardening-community.vercel.app/api/garden-tips",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

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
        toast.error("Failed to submit tip.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto mt-10 p-6 border border-gray-300 dark:border-gray-600 rounded-3xl
      bg-white dark:bg-gray-900 shadow-lg transition-all duration-300">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-600 dark:text-green-400 mb-8">
        ➕ Share a Garden Tip
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="font-medium text-gray-700 dark:text-gray-300 block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="How I Grow Tomatoes Indoors"
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>

        {/* Plant Type */}
        <div>
          <label className="font-medium text-gray-700 dark:text-gray-300 block mb-1">Plant Type / Topic</label>
          <input
            type="text"
            name="plantType"
            value={formData.plantType}
            onChange={handleChange}
            placeholder="Tomato, Herbs, etc."
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>

        {/* Difficulty & Category */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="font-medium text-gray-700 dark:text-gray-300 block mb-1">Difficulty Level</label>
            <select
              name="difficultyLevel"
              value={formData.difficultyLevel}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="font-medium text-gray-700 dark:text-gray-300 block mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              <option value="Composting">Composting</option>
              <option value="Plant Care">Plant Care</option>
              <option value="Vertical Gardening">Vertical Gardening</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="font-medium text-gray-700 dark:text-gray-300 block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write your detailed garden tip here..."
            rows={4}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-vertical focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>

        {/* Images URL */}
        <div>
          <label className="font-medium text-gray-700 dark:text-gray-300 block mb-1">Images URL</label>
          <input
            type="url"
            name="imagesUrl"
            value={formData.imagesUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="font-medium text-gray-700 dark:text-gray-300 block mb-1">Availability</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="Public">Public</option>
            <option value="Hidden">Hidden</option>
          </select>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300 block mb-1">User Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300 block mb-1">User Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-md transition-all duration-300 transform hover:scale-[1.02]"
        >
          Submit Tip
        </button>
      </form>
    </div>
  );
};

export default ShareGardenTip;
