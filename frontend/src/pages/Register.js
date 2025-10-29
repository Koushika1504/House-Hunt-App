import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "renter",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚨 Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("⚠️ Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/users/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        password: formData.password,
      });

      alert("✅ Registration successful! Please login.");
      setError("");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "550px" }}>
      <h2 className="text-center mb-4">Create Your Account</h2>

      {/* 🔴 Error Alert */}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            placeholder="Enter your phone number"
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role Selection */}
        <div className="mb-3">
          <label className="form-label d-block">I am a:</label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="renter"
              value="renter"
              checked={formData.role === "renter"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="renter">
              Renter
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="owner"
              value="owner"
              checked={formData.role === "owner"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="owner">
              Owner
            </label>
          </div>
        </div>

        {/* Password */}
        <div className="mb-3 position-relative">
          <label className="form-label">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "38px",
              cursor: "pointer",
              userSelect: "none",
              color: "#555",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="mb-3 position-relative">
          <label className="form-label">Confirm Password</label>
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            className="form-control"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            style={{
              position: "absolute",
              right: "10px",
              top: "38px",
              cursor: "pointer",
              userSelect: "none",
              color: "#555",
            }}
          >
            {showConfirm ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
