import React from "react";
import "./Navbar.css"

export default function Navbar () {
  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        <b>Gamers for Gamers</b>
      </a>
      <div
        className="navigation-menu">
        <ul>
          <li>
            <a href="/mymods"><b>My Mods</b></a>
          </li>
          <li>
            <a href="/favorites"><b>My Favorites</b></a>
          </li>
          <li>
            <a href="/create"><b>Create Mods</b></a>
          </li>
          <li>
            <a href="/about"><b>About Us</b></a>
          </li>
          <li>
            <a href="/login_signup"><b>Log in/Sign Up</b></a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

