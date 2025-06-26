import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
         toast.success("Tip Updated successfully!");
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
    <div className="max-w-2xl mx-auto mt-10 p-6 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-6 text-center text-green-700 dark:text-green-400">Update Garden Tip</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Title:</label>
          <input
            type="text"
            name="title"
            value={tipData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Plant Type:</label>
          <input
            type="text"
            name="plantType"
            value={tipData.plantType}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Difficulty Level:</label>
          <select
            name="difficultyLevel"
            value={tipData.difficultyLevel}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded"
          >
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Description:</label>
          <textarea
            name="description"
            value={tipData.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded h-28 resize-vertical"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Image URL:</label>
          <input
            type="url"
            name="imagesUrl"
            value={tipData.imagesUrl || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isPublic"
            checked={tipData.isPublic || false}
            onChange={handleChange}
            className="accent-green-600"
          />
          <label className="font-medium text-gray-800 dark:text-gray-200">Make this tip public</label>
        </div>

        <fieldset className="border-t border-gray-300 dark:border-gray-600 pt-4">
          <legend className="text-lg font-semibold text-gray-800 dark:text-gray-200">User Info</legend>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Name:</strong> {tipData.name || user?.name}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Email:</strong> {tipData.email || user?.email}
          </p>
        </fieldset>

        <button
          type="submit"
          disabled={submitLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
        >
          {submitLoading ? 'Updating...' : 'Update Tip'}
        </button>
      </form>

      {successMsg && <p className="text-green-600 dark:text-green-400 mt-4 text-center">{successMsg}</p>}
    </div>
  );
};

export default UpdateTipPage;
