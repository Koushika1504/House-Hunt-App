import React, { useState } from "react";
import axios from "axios";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    image: null,
  });

  const [preview, setPreview] = useState(null); // For image preview

  // Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file)); // Preview selected image
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("image", formData.image);

    try {
      const res = await axios.post("http://localhost:5001/api/properties/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Property added successfully!");
      console.log(res.data);
      setFormData({ title: "", description: "", price: "", location: "", image: null });
      setPreview(null);
    } catch (err) {
      alert("❌ Error adding property");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Add New Property</h2>

      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Property Image</label>
          <input type="file" className="form-control" onChange={handleFileChange} required />
        </div>

        {preview && (
          <div className="text-center mb-3">
            <p className="text-muted">Image Preview:</p>
            <img
              src={preview}
              alt="Preview"
              style={{ width: "100%", maxHeight: "250px", objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
