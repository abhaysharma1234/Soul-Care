import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars,faXmark} from "@fortawesome/free-solid-svg-icons";
import "./Astyle/Anavbar.css"
import { useAuth } from "../../Auth/useAuth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const linkstyle={
  textDecoration: "none",
  fontSize:"1.5vw",
  marginTop:"-3vh"

};

function Navbar() {

  const { isSign, user, SignOut } = useAuth();
  const [nav, setNav] = useState(false);
  
  const openNav = () => {
    setNav(!nav);
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
          <Link to="/Aappointment" className="navbar-links">
            Appointment
          </Link>
        </li>
      </ul>
      <div className="dropdown">
        <Link to={isSign ? "#" : "/login"} style={linkstyle} className="Login">
          <div
            className="Login_btn d-flex align-items-center justify-content-center mt-2"
            style={{ fontSize: "1.5rem" }}
          >
            <i className="fa-solid fa-user-doctor me-2"></i>
            {isSign ? <>{user.username}</> : <>Login</>}
          </div>
        </Link>
        {isSign && (
          <div className="dropdown-content pt-4">
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
            <Link onClick={openNav} to="/Aappointment">
              Appointment
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
