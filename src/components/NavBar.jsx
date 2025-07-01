import React from "react";
import "./NavBarStyles.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return <nav className="navbar">
    <Link to="/">Home page</Link>
    <Link to="/campuses">Campuses</Link>
    <Link to="/students">Students</Link>
  </nav>;
};

export default NavBar;
