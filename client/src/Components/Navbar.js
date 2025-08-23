import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useAuth} from '../Auth/useAuth'
import {faBars,faXmark,} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


function Navbar() {

  const { isSign,user,SignOut } = useAuth();
  const [nav, setNav] = useState(false);
  
  const openNav = () => {
    setNav(!nav);
  };

  const linkstyle={
    textDecoration: "none",
    fontSize:"1.5vw",
    marginTop:"-3vh"
  };

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">Harmony</Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
          <Link to="/testpage" className="navbar-links">
            Tests
          </Link>
        </li>
        <li>
          <Link to="/doctor" className="navbar-links">
            Doctors
          </Link>
        </li>
        <li>
          <Link to="/appointment" className="navbar-links">
            Appointment
          </Link>
        </li>
        <li>
          <Link to="/about" className="navbar-links">
            About
          </Link>
        </li>
      </ul>
      <div className="dropdown">
        <Link to={isSign ? "#" : "/login"} style={linkstyle} className="Login">
          <div
            className="Login_btn d-flex align-items-center justify-content-center mt-2"
            style={{ fontSize: "1.5rem" }}
          >
            <i className="fa-solid fa-user me-2"></i>
            {isSign ? <>{user.username}</> : <>Login</>}
          </div>
        </Link>
        {isSign && (
          <div className="dropdown-content">
            <Link to="/userhistory">
              <i className="fa-solid fa-notes-medical"></i>History
            </Link>
            <Link
              onClick={() => {
                SignOut();
                toast.warning("Signout successfully", {
                  position: "top-center",
                });
              }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>Logout
            </Link>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className={`mobile-navbar taskbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links ">
          <li>
            <Link onClick={openNav} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link onClick={openNav} to="/testpage">
              Tests
            </Link>
          </li>
          <li>
            <Link onClick={openNav} to="/doctor">
              Doctors
            </Link>
          </li>
          <li>
            <Link onClick={openNav} to="/appointment">
              Appointment
            </Link>
          </li>
          <li>
            <Link onClick={openNav} to="/about">
              About
            </Link>
          </li>
          <li>
            {isSign ? (
              <Link
                onClick={() => {
                  openNav();
                  SignOut();
                }}
                to="/"
              >
                Logout
              </Link>
            ) : (
              <Link onClick={openNav} to="/login">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;
