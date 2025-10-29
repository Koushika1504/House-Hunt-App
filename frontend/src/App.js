import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Properties from "./pages/Properties";
import Bookings from "./pages/Bookings";
import AddProperty from "./pages/AddProperty";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/" element={<Home />} />

        {/* 🏠 Owner-only route */}
        <Route
          path="/add-property"
          element={
            <ProtectedRoute role="owner">
              <AddProperty />
            </ProtectedRoute>
          }
        />

        {/* 📖 Renter-only route */}
        <Route
          path="/bookings"
          element={
            <ProtectedRoute role="renter">
              <Bookings />
            </ProtectedRoute>
          }
        />

        {/* Default route */}
        <Route path="/" element={<Properties />} />
      </Routes>
    </Router>
  );
}

export default App;
