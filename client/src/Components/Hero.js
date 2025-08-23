import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../Styles/Hero.css";
import Doctor from "../Assets/hero-doctor.png";

function Hero() {
  const navigate = useNavigate();

  const handleBookAppointmentClick = () => {
    navigate("/appointment");
  };

  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          <p className="text-headline">Take care of your mind</p>
          <h2 className="text-title">
            Book a mental health checkup and take the first step towards a healthier you
          </h2>
          <p className="text-description">
            Our team of licensed therapists and psychiatrists are here to support you. Get personalized guidance, therapy, and treatment plans tailored to your needs.
          </p>
          <button
            className="text-appointment-btn"
            type="button"
            onClick={handleBookAppointmentClick}
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> Book an Appointment
          </button>
          <div className="text-stats">
            <div className="text-stats-container">
              <p>10,000+</p>
              <p>Happy clients</p>
            </div>

            <div className="text-stats-container">
              <p>500+</p>
              <p>Expert therapists</p>
            </div>

            <div className="text-stats-container">
              <p>95%</p>
              <p>Client satisfaction rate</p>
            </div>
          </div>
        </div>

        <div className="hero-image-section">
          <img className="hero-image1" src={Doctor} alt="Mental Health" />
        </div>
      </div>
    </div>
  );
}

export default Hero;