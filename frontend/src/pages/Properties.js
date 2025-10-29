import React, { useEffect, useState } from "react";
import axios from "axios";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/properties");
        setProperties(res.data);
      } catch (err) {
        console.error("❌ Error fetching properties:", err);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Available Properties</h2>

      {properties.length === 0 ? (
        <p className="text-center text-muted">No properties available.</p>
      ) : (
        <div className="row">
          {properties.map((property) => (
            <div className="col-md-4 mb-4" key={property._id}>
              <div className="card shadow-sm border-0">
                {property.image && (
                  <img
                    src={`http://localhost:5001/uploads/${property.image}`}
                    alt={property.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{property.title}</h5>
                  <p className="card-text text-muted">{property.description}</p>
                  <p className="card-text">
                    <strong>₹{property.price}</strong> / month
                  </p>
                  <p className="card-text">
                    📍 <em>{property.location}</em>
                  </p>
                  <button className="btn btn-outline-primary w-100">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;
