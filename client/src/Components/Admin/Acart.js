import React from 'react';
import "./Astyle/Aappointment.css";
import { toast } from 'react-toastify';

function Acart(props) {
    const {
      id,
      email,
      name,
      number,
      gender,
      appointmentTime,
      preferMode,
      deleteData,
    } = props;
    

    const onReject = ()=>{
        toast.info("Appointment Declined");
        deleteData(id);
    }
    const onAccept = async()=>{
        try {
             const res = await fetch("http://localhost:5000/sendEmail", {
            //const res = await fetch(
              //"https://soul-care.onrender.com/sendEmail",
              
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, name: name }),
              }
            );
            if(res.status>199 && res.status<300){
                toast.success("Appointment Accepted");
            } else {
                throw new Error('Failed to send email');
            }
          } catch(err) {
            console.error(err);
            toast.error('Failed to send email');
          }
          // console.log(id,email)
        deleteData(id);
    }
    return (
        <div className="patient-card" style={{ marginBottom: '20px' }}>
            <div className="info">
                <p><span className="label">Name:</span> {name}</p>
                <p><span className="label">Patient Number:</span> {number}</p>
                <p><span className="label">Gender:</span> {gender}</p>
                <p><span className="label">Appointment Date:</span> {appointmentTime.split('T')[0]}</p>
                <p><span className="label">Preferred Mode:</span> {preferMode}</p>
                {/* <p><span className="label">Level of Symptoms:</span> {symptomsLevel}</p> */}
                {/* <p><span className="label">Mental Test Score:</span> {mentalTestScore}</p> */}
                
            </div>
            <div className="button-container">
                <button className="button" onClick={onAccept}>Accept</button>
                <button className="button reject-button" onClick={onReject}>Reject</button>
            </div>
        </div>
    );
};

export default Acart;
