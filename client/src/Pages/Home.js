import React from "react";
import Hero from "../Components/Hero";
import Info from "../Components/Info";
import BookAppointment from "../Components/BookAppointment";
import Reviews from "../Components/Reviews";

function Home() {
  return (
    <div className="home-section">  
      <Hero />
      <Info />
      <BookAppointment />
      <Reviews />
    </div>
  );
}

export default Home;
