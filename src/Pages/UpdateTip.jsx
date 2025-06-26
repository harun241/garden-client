import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTipPage = ({ user }) => {
  const { tipId } = useParams();
  const navigate = useNavigate();

  const [tipData, setTipData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetch(`https://gardening-community.vercel.app/api/garden-tips/${tipId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load tip data');
        return res.json();
      })
      .then((data) => {
        setTipData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [tipId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTipData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);
    setSuccessMsg('');

    const updatedTip = {
      title: tipData.title,
      plantType: tipData.plantType,
      difficultyLevel: tipData.difficultyLevel,
      description: tipData.description,
      imagesUrl: tipData.imagesUrl,
      isPublic: tipData.isPublic,
    };

    fetch(`https://gardening-community.vercel.app/api/garden-tips/${tipId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTip),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update tip');
        return res.json();
      })
      .then(() => {
        setSuccessMsg('Tip updated successfully!');
        setSubmitLoading(false);
        setTimeout(() => {
          navigate('/my-tips');
        }, 1500);
      })
      .catch((err) => {
        setError(err.message);
        setSubmitLoading(false);
      });
  };

  if (loading) return <p className="text-center mt-10 text-gray-700 dark:text-gray-200">Loading tip data...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;
  if (!tipData) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-10">
    <div className="w-full max-w-2xl p-6 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-6 text-center text-green-700 dark:text-green-400">
        Update Garden Tip
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-800 dark:text-gray-200">Title</label>
          <input
            type="text"
            name="title"
            value={tipData.title}
            onChange={handleChange}
            required
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded w-full"
          />
        </div>

        {/* Plant Type */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-800 dark:text-gray-200">Plant Type</label>
          <input
            type="text"
            name="plantType"
            value={tipData.plantType}
            onChange={handleChange}
            required
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded w-full"
          />
        </div>

        {/* Difficulty Level */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-800 dark:text-gray-200">Difficulty Level</label>
          <select
            name="difficultyLevel"
            value={tipData.difficultyLevel}
            onChange={handleChange}
            required
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded w-full"
          >
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-800 dark:text-gray-200">Description</label>
          <textarea
            name="description"
            value={tipData.description}
            onChange={handleChange}
            required
            rows={3}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded w-full resize-none"
          />
        </div>

        {/* Image URL */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-800 dark:text-gray-200">Image URL</label>
          <input
            type="url"
            name="imagesUrl"
            value={tipData.imagesUrl || ''}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded w-full"
          />
        </div>

        {/* isPublic Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublic"
            checked={tipData.isPublic || false}
            onChange={handleChange}
            className="accent-green-600"
          />
          <label className="text-gray-800 dark:text-gray-200">Make this tip public</label>
        </div>

        {/* User Info */}
        <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">User Info</h4>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Name:</strong> {tipData.name || user?.name}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Email:</strong> {tipData.email || user?.email}
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
        >
          {submitLoading ? 'Updating...' : 'Update Tip'}
        </button>

        {successMsg && (
          <p className="text-green-600 dark:text-green-400 mt-2 text-center">{successMsg}</p>
        )}
      </form>
    </div>
  </div>
);
};


export default UpdateTipPage;
