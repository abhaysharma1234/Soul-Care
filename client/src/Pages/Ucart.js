import React from "react";

function Ucart(props) {
    const { name, appointmentTime, preferMode } = props;
    
    return (
        <div className="patient-card" style={{ marginBottom: '20px' }}>
            <div className="info">
                <p><span className="label">Doctor Name:</span> {name}</p>
                <p><span className="label">Appointment Time:</span> {appointmentTime}</p>
                <p><span className="label">Preferred Mode:</span> {preferMode}</p>
                {/* <p><span className="label">Level of Symptoms:</span> {symptomsLevel}</p>
                <p><span className="label">Mental Test Score:</span> {mentalTestScore}</p> */}
            </div>
        </div>
    );
};

export default Ucart;