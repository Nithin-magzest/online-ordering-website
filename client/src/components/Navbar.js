import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // create this file

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/restaurants">Restaurants</Link>
      <Link to="/cart">Cart</Link>
    </nav>
  );
};

export default Navbar;
