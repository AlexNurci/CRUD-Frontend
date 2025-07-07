import React, { useState } from "react";
import "./NavBarStyles.css";
import { Link, NavLink } from "react-router-dom";
<<<<<<< HEAD
import { AiFillHome } from "react-icons/ai"; // npm install react-icons
=======
import { AiFillHome } from "react-icons/ai";
>>>>>>> 19e8a32345fc1432e71361b31f077cbc1a35dd23

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
<<<<<<< HEAD
  </nav>;
=======
  </nav>; 
>>>>>>> 19e8a32345fc1432e71361b31f077cbc1a35dd23
};

export default NavBar;