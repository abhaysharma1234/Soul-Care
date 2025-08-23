import React from 'react';
import Acart from "./Acart.js";
import useGetData from '../../Auth/useGetData'
import NoAppoint from '../../Pages/NoAppoint.js'

function Aappointment() {
    const { data } = useGetData("http://localhost:5000/getappointment");

    // If data is empty, render NotFound component
    if (!data || data.length === 0) {
      return <NoAppoint />;
  }
    return (
      <div>
        {data.map((appoint, index) => {
          return (
            <Acart
              key={index}
              id={appoint._id}
              email={appoint.userEmail}
              name={appoint.patientName}
              number={appoint.patientNumber}
              gender={appoint.patientGender}
              appointmentTime={appoint.appointmentTime}
              preferMode={appoint.preferredMode}
              symptomsLevel={appoint.symptomsLevel}
              mentalTestScore={appoint.mentalTestScore}
            />
          );
        })}
      </div>
    );
};

export default Aappointment;
