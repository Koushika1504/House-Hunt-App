import React, { useEffect, useState } from "react";
import axios from "axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All"); // Filter state

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("❌ Error fetching bookings:", err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5001/api/bookings/${id}/status`, { status });
      alert(`Booking ${status} successfully!`);
      fetchBookings();
    } catch (err) {
      console.error("❌ Error updating booking:", err);
    }
  };

  // Filter logic
  const filteredBookings =
    filter === "All"
      ? bookings
      : bookings.filter((b) => b.status === filter);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📋 Manage Bookings</h2>

      {/* Filter Buttons */}
      <div className="text-center mb-4">
        {["All", "Pending", "Approved", "Rejected"].map((status) => (
          <button
            key={status}
            className={`btn btn-${
              filter === status ? "primary" : "outline-primary"
            } mx-2`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <p className="text-center text-muted">No {filter.toLowerCase()} bookings.</p>
      ) : (
        <table className="table table-striped table-bordered shadow">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Property</th>
              <th>User</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>
                  {booking.property?.title}
                  <br />
                  <small className="text-muted">
                    ₹{booking.property?.price} | {booking.property?.location}
                  </small>
                </td>
                <td>
                  {booking.user?.name || "Guest"}
                  <br />
                  <small className="text-muted">{booking.user?.email}</small>
                </td>
                <td>
                  <span
                    className={`badge bg-${
                      booking.status === "Pending"
                        ? "warning"
                        : booking.status === "Approved"
                        ? "success"
                        : "danger"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td>
                  {booking.status === "Pending" ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleStatusChange(booking._id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleStatusChange(booking._id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <em className="text-muted">No actions</em>
                  )}
                </td>
                <td>{new Date(booking.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookings;
