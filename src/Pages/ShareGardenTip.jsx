import { useState } from "react";

const ShareGardenTip = ({ user }) => {
  if (!user) {
    return (
      <p style={{ textAlign: "center", marginTop: 20 }}>
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
      const response = await fetch("http://localhost:3000/api/garden-tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Tip submitted successfully!");
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
      console.error("Error submitting tip:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>➕ Share a Garden Tip</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="How I Grow Tomatoes Indoors"
            required
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Plant Type/Topic:
          <input
            type="text"
            name="plantType"
            value={formData.plantType}
            onChange={handleChange}
            placeholder="Tomato, Herbs, etc."
            required
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Difficulty Level:
          <select
            name="difficultyLevel"
            value={formData.difficultyLevel}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>

        <label style={labelStyle}>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write your detailed garden tip here..."
            rows={5}
            required
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </label>

        <label style={labelStyle}>
          Images URL:
          <input
            type="url"
            name="imagesUrl"
            value={formData.imagesUrl}
            onChange={handleChange}
            placeholder="img url"
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="Composting">Composting</option>
            <option value="Plant Care">Plant Care</option>
            <option value="Vertical Gardening">Vertical Gardening</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label style={labelStyle}>
          Availability:
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="Public">Public</option>
            <option value="Hidden">Hidden</option>
          </select>
        </label>

        <label style={labelStyle}>
          User Email:
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            style={{ ...inputStyle, backgroundColor: "#f0f0f0" }}
          />
        </label>

        <label style={labelStyle}>
          User Name:
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            style={{ ...inputStyle, marginBottom: 24, backgroundColor: "white" }}
          />
        </label>

        <button type="submit" style={buttonStyle}>
          Submit Tip
        </button>
      </form>
    </div>
  );
};

const containerStyle = {
  maxWidth: 600,
  width: "90%",
  margin: "2rem auto",
  padding: "1rem",
  border: "1px solid #ccc",
  borderRadius: 8,
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#fafafa",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  boxSizing: "border-box",
};

const headingStyle = {
  marginBottom: "1rem",
  color: "#2f855a",
  textAlign: "center",
};

const labelStyle = {
  display: "block",
  marginBottom: 6,
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  marginTop: 4,
  marginBottom: 12,
  borderRadius: 4,
  border: "1px solid #ccc",
  fontSize: "1rem",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "0.7rem",
  backgroundColor: "#38a169",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "bold",
  marginTop: 12,
};

export default ShareGardenTip;
