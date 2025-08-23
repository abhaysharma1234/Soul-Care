import React from "react";
import InformationCard from "./InformationCard";
import {faVialCircleCheck,faUserDoctor,faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>What We Do</span>
        </h3>
        <p className="info-description">
        We deliver mental healthcare right to your fingertips, providing a full spectrum of on-demand services customized to your unique needs. Our platform enables you to schedule appointments, engage in predictive mental health assessments powered by machine learning quizzes, and connect with seasoned professionals. Receive expert advice, obtain online prescriptions, and access prompt refills whenever you need them.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Prediction based on test"
          description="At our mental health platform, we use advanced technology like machine learning to predict mental health outcomes. Users take interactive tests that gather important information, helping us provide personalized insights and anticipate potential challenges. This proactive approach empowers individuals to prioritize self-care and seek support as needed, enhancing their mental well-being with confidence."
          icon={faVialCircleCheck}
        />

        <InformationCard
          title="Connect with doctor"
          description="Our platform offers effortless connections with experienced mental health professionals. Users engage in secure video consultations and messaging for confidential discussions with licensed therapists and counselors. Whether seeking guidance, therapy, or medication management, our platform fosters meaningful connections for mental well-being."
          icon={faUserDoctor}
        />

        <InformationCard
          title="Get a solution"
          description="Our platform provides tailored solutions for mental health concerns, offering personalized guidance and support to address individual needs effectively. Through collaborative efforts and personalized care plans, our platform ensures users find effective solutions to navigate their mental health journey with confidence and support."
          icon={faThumbsUp}
        />
      </div>
    </div>
  );
}

export default Info;
