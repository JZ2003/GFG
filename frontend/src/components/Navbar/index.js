import React from "react";
import "./Navbar.css"

export default function Navbar () {
  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        GamersforGamers
      </a>
      <div
        className="navigation-menu">
        <ul>
          <li>
            <a href="/mymods">My Mods</a>
          </li>
          <li>
            <a href="/favorites">My Favorites</a>
          </li>
          <li>
            <a href="/create">Upload/Edit Mods</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/login_signup">Log in/Sign Up</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

