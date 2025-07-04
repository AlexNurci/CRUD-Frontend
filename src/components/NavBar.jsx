import React, { useState } from "react";
import "./NavBarStyles.css";
import { Link, NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

const NavBar = () => {
  const [dropOpen, setDropOpen] = useState(false);

  return <nav className="navbar">
    <Link to="/" className="Home"><AiFillHome/></Link>
    <ul>
      <li>
        <NavLink to="/campuses">Campuses</NavLink>
      </li>
      <li>
        <NavLink to="/students">Students</NavLink>
      </li>
    </ul>
  </nav>; 
};

export default NavBar;
