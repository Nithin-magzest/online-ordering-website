import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { CartContext } from "../Context/CartContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef();
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropOpen(false);
    navigate("/otp-login"); // redirect to OTP login after logout
  };

  const getInitials = (userId) => userId?.slice(0, 2).toUpperCase() || "U";

  return (
    <nav className="navbar">
      {/* Left: Brand */}
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          🍽️ FeastFlow
        </Link>
      </div>

      {/* Center: Links */}
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/cart">🛒 Cart ({cartItems.length})</Link>
      </div>

      {/* Right: Login / Profile */}
      <div className="navbar-right">
        {user ? (
          <div className="nav-profile" ref={dropRef}>
            <button
              className="nav-avatar"
              onClick={() => setDropOpen((p) => !p)}
              title={user.userId}
            >
              {getInitials(user.userId)}
            </button>

            {dropOpen && (
              <div className="nav-dropdown">
                <div className="nav-dropdown-header">
                  <div className="nav-dropdown-avatar">
                    {getInitials(user.userId)}
                  </div>
                  <div>
                    <div className="nav-dropdown-name">{user.userId}</div>
                    <div className="nav-dropdown-email">{user.email}</div>
                  </div>
                </div>

                <div className="nav-dropdown-divider" />

                <div className="nav-dropdown-info">
                  <span>📍</span>
                  <span>
                    {user.locationGranted ? "Location shared" : "No location"}
                  </span>
                </div>

                <div className="nav-dropdown-divider" />

                <button className="nav-logout-btn" onClick={handleLogout}>
                  🚪 Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          // Updated to OTP Login page
          <Link to="/otp-login" className="nav-login-btn">
            Login / OTP
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
