import React, { useState, useEffect } from "react";
import "../Styles/AppointmentForm.css";
import { toast } from "react-toastify";
import {useAuth} from '../Auth/useAuth'

function AppointmentForm() {
  const { user } = useAuth();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const [formData, setFormData] = useState({
    userEmail: user.email,
    patientName: "",
    patientNumber: "",
    patientGender: "default",
    appointmentDate: "",
    appointmentTime: "",
    doctor:"default",
    preferredMode: "default"
  });

  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [patientGender, setPatientGender] = useState("default");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [preferredMode, setPreferredMode] = useState("default");
  const [doctor, setDoctor] = useState("default");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });

    if (e.target.name === "patientName") {
      setPatientName(e.target.value);
    } else if (e.target.name === "patientNumber") {
      setPatientNumber(e.target.value);
    } else if (e.target.name === "patientGender") {
      setPatientGender(e.target.value);
    } else if (e.target.name === "appointmentTime") {
      setAppointmentTime(e.target.value);
    } else if (e.target.name === "preferredMode") {
      setPreferredMode(e.target.value);
    } else if (e.target.name === "doctor"){
      setDoctor(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    const errors = {};
    if (!patientName.trim()) {
      errors.patientName = "Patient name is required";
    } else if (patientName.trim().length < 8) {
      errors.patientName = "Patient name must be at least 8 characters";
    }

    if (!patientNumber.trim()) {
      errors.patientNumber = "Patient phone number is required";
    } else if (patientNumber.trim().length !== 10) {
      errors.patientNumber = "Patient phone number must be of 10 digits";
    }

    if (patientGender === "default") {
      errors.patientGender = "Please select patient gender";
    }
    if (!appointmentTime) {
      errors.appointmentTime = "Appointment time is required";
    } else {
      const selectedTime = new Date(appointmentTime).getTime();
      const currentTime = new Date().getTime();
      if (selectedTime <= currentTime) {
        errors.appointmentTime = "Please select a future appointment time";
      }
    }
    if (preferredMode === "default") {
      errors.preferredMode = "Please select preferred mode";
    }
    if (doctor === "default") {
      errors.doctor = "Please select doctor name";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Backend
    try {
      const response = await fetch(
        "http://localhost:5000/submit-appointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error submitting form");
      }
      if (response.ok) {
        toast.success("Form submitted successfully");
      }

      setFormData({
        userEmail: user.email,
        patientName: "",
        patientNumber: "",
        patientGender: "default",
        appointmentDate: "",
        appointmentTime: "",
        preferredMode: "default",
        doctor: "default"
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Errorsubmitting form:", error);
    }

    // Reset form fields and errors after successful submission
    setPatientName("");
    setPatientNumber("");
    setPatientGender("default");
    setAppointmentDate("");
    setAppointmentTime("");
    setPreferredMode("default");
    setDoctor("default");
    setFormErrors({});
  };

  return (
    <div className="appointment-form-section">
      <div className="form-container">
        <h2 className="form-title">
          <span>Appointment Form</span>
        </h2>
        <form className="form-content" onSubmit={handleSubmit}>
          <label>
            Patient Full Name:
            <input
              type="text"
              name="patientName"
              value={patientName}
              onChange={handleInputChange}
              required
            />
            {formErrors.patientName && (
              <p className="error-message">{formErrors.patientName}</p>
            )}
          </label>

          <label>
            Patient Phone Number:
            <input
              type="text"
              name="patientNumber"
              value={patientNumber}
              onChange={handleInputChange}
              required
            />
            {formErrors.patientNumber && (
              <p className="error-message">{formErrors.patientNumber}</p>
            )}
          </label>

          <label>
            Patient Gender:
            <select
              name="patientGender"
              value={patientGender}
              onChange={handleInputChange}
              required
            >
              <option value="default">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="private">I will inform Doctor only</option>
            </select>
            {formErrors.patientGender && (
              <p className="error-message">{formErrors.patientGender}</p>
            )}
          </label>

          
          <label>
            Preferred Appointment Date:
            <input
              type="date"
              name="appointmentTime"
              value={appointmentTime}
              onChange={handleInputChange}
              required
            />
            {formErrors.appointmentTime && (
              <p className="error-message">{formErrors.appointmentTime}</p>
            )}
          </label>

          <label>
            Psychiatrist name:
            <select
              name="doctor"
              value={doctor}
              onChange={handleInputChange}
              required
            >
              <option value="default">Select</option>
              <option value="Mistry">Dr. Mistry</option>
              <option value="Ether">Dr. Ether</option>
              <option value="Truluck">Dr. Truluck</option>
              <option value="Pyne">Dr. Pyne</option>
              <option value="Johnathan">Dr. Johnathan</option>
            </select>
            {formErrors.doctor && (
              <p className="error-message">{formErrors.doctor}</p>
            )}
          </label>

          <label>
            Preferred Mode:
            <select
              name="preferredMode"
              value={preferredMode}
              onChange={handleInputChange}
              required
            >
              <option value="default">Select</option>
              <option value="voice">Voice Call</option>
              <option value="video">Video Call</option>
            </select>
            {formErrors.preferredMode && (
              <p className="error-message">{formErrors.preferredMode}</p>
            )}
          </label>

          <button type="submit" className="text-appointment-btn">
            Confirm Appointment
          </button>

          <p
            className="success-message"
            style={{ display: isSubmitted ? "block" : "none" }}
          >
            Appointment details have been sent to the patient's phone number via
            SMS.
          </p>
        </form>
      </div>

      <div className="legal-footer">
        <p>Your privacy is important to us</p>
      </div>

    </div>
  );
}

export default AppointmentForm;