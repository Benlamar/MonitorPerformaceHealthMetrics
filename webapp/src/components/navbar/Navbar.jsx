import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="menu-list">
        <Link to="/">
          <li className="menu-item text-sm">Monitor</li>
        </Link>
        <Link to="/activity">
          <li className="menu-item text-sm">Activity</li>
        </Link>
        <Link to="/about">
          <li className="menu-item text-sm">About</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
