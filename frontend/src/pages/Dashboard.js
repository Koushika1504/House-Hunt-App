import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    properties: 0,
    bookings: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, propertiesRes, bookingsRes] = await Promise.all([
          axios.get("http://localhost:5001/api/users"),
          axios.get("http://localhost:5001/api/properties"),
          axios.get("http://localhost:5001/api/bookings"),
        ]);

        setStats({
          users: usersRes.data.length,
          properties: propertiesRes.data.length,
          bookings: bookingsRes.data.length,
        });
      } catch (err) {
        console.error("Error fetching stats:", err.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📊 Dashboard Overview</h2>

      <div className="row text-center">
        <div className="col-md-4">
          <div className="card bg-primary text-white mb-3">
            <div className="card-body">
              <h4>{stats.users}</h4>
              <p>Registered Users</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white mb-3">
            <div className="card-body">
              <h4>{stats.properties}</h4>
              <p>Available Properties</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-warning text-white mb-3">
            <div className="card-body">
              <h4>{stats.bookings}</h4>
              <p>Total Bookings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
