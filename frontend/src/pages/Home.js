import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-section text-center text-white">
        <div className="container py-5">
          <h1 className="fw-bold display-5">Find Your Perfect <br /> Home in Andhra Pradesh</h1>
          <p className="mt-3 fs-5">
            Connect with trusted house owners and discover amazing rental properties across all cities in Andhra Pradesh.
          </p>
          <div className="mt-4">
            <a href="/properties" className="btn btn-light mx-2">🔍 Search Properties</a>
            <a href="/register" className="btn btn-outline-light mx-2">👤 Join HouseRent</a>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section py-5 text-center">
        <h2 className="fw-bold mb-4">Why Choose HouseRent?</h2>
        <p className="text-muted mb-5">We make finding and listing properties simple, secure, and efficient.</p>
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card shadow-sm p-4">
                <h5>🛡 Verified Properties</h5>
                <p className="text-muted">All properties are verified to ensure authenticity and quality.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm p-4">
                <h5>🤝 Trusted Community</h5>
                <p className="text-muted">Connect with verified owners and renters in your area.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm p-4">
                <h5>⏰ 24/7 Support</h5>
                <p className="text-muted">Our support team is available round the clock to help you.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm p-4">
                <h5>✅ Easy Process</h5>
                <p className="text-muted">Simple and straightforward process to list or rent properties.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section text-center text-white py-5">
        <h2 className="fw-bold mb-3">Ready to Find Your Perfect Home?</h2>
        <p>Join thousands of satisfied users who found their ideal properties through HouseRent.</p>
        <div className="mt-3">
          <a href="/properties" className="btn btn-light mx-2">Start Searching</a>
          <a href="/add-property" className="btn btn-outline-light mx-2">List Your Property</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-section text-white py-4">
        <div className="container d-flex justify-content-between flex-wrap">
          <div>
            <h4>🏠 HouseRent</h4>
            <p>Connecting owners and renters across Andhra Pradesh with ease.</p>
            <small>© 2025 HouseRent. All rights reserved.</small>
          </div>
          <div>
            <h6>Quick Links</h6>
            <a href="/" className="footer-link">Home</a><br />
            <a href="/properties" className="footer-link">Search Properties</a><br />
            <a href="/register" className="footer-link">Register</a><br />
            <a href="/login" className="footer-link">Login</a>
          </div>
          <div>
            <h6>Contact</h6>
            <p>Email: info@houserent.com</p>
            <p>Phone: +91 9876543210</p>
            <p>Andhra Pradesh, India</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
