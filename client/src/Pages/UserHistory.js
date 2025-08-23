import React from 'react';
import Ucart from '../Pages/Ucart.js';
import useGetData from '../Auth/useGetData.js';
import { useAuth } from '../Auth/useAuth.js';
import Notyet from './Notyet.js'; 

function History() {
    const { user } = useAuth();
    const { data, error } = useGetData(
      `http://localhost:5000/gethistory?email=${user?.email}`
    );

    console.log(error);
    
    // If data is empty, render NotFound component
    if (!data || data.length === 0) {
        return <Notyet />;
    }

    return (
        <div>
            {data.map((hist, index) => (
                <Ucart
                    key={index}
                    name={hist.doctor}
                    appointmentTime={hist.appointmentTime}
                    preferMode={hist.preferredMode}
                    symptomsLevel={user.symptoms}
                    mentalTestScore={user.score}
                />
            ))}
        </div>
    );
};

export default History;
