import React from 'react';
import { Link } from 'react-router-dom'; 
import './Astyle/Ahome.css'; 
import { useAuth } from '../../Auth/useAuth';

function DoctorHomePage() {
    const {user} = useAuth()
    return (
        <div className="doctor-home">
            <header className="header">
                <h1 className="title">Welcome, Dr. {user.username}!</h1>
                <p className="subtitle">Here you can manage customer tests, view scores, and provide support.</p>
            </header>
            <main className="main-content">
                <section className="section">
                    <h2 className="section-title">Understanding Customer Tests</h2>
                    <p>Customers take mental health quizzes to assess their well-being. The quizzes cover various aspects of mental health, including stress levels, anxiety, depression, and more.</p>
                    <p>Each quiz consists of multiple-choice questions or other interactive elements. Customers provide their answers, and the system evaluates their responses to generate scores.</p>
                </section>
                <section className="section">
                    <h2 className="section-title">Scoring System</h2>
                    <p>The scoring system assigns points based on the accuracy and completeness of the customer's answers. Higher scores indicate areas of concern, while lower scores may suggest better mental well-being.</p>
                    <p>After completing a quiz, customers receive instant feedback along with their scores. Doctors can review these scores and provide further guidance or support as needed.</p>
                </section>
                <section className="section">
                    <h2 className="section-title">Levels of Quizzes</h2>
                    <p>Quizzes are categorized into different levels based on their complexity and the mental health aspects they address. These levels include:</p>
                    <ul>
                        <li>Normal</li>
                        <li>Normal Symptoms</li>
                        <li>Below Moderate</li>
                        <li>Moderate</li>
                        <li>Need to Talk with a Psychiatrist</li>
                    </ul>
                    <p>Customers can choose quizzes based on their current needs and comfort levels.</p>
                </section>
                <section className="section">
                    <h2 className="section-title">What You Can Do</h2>
                    <p>As a doctor, you have several responsibilities:</p>
                    <ul>
                        <li>Review customer test results and scores.</li>
                        <li>Provide personalized recommendations and support based on test outcomes.</li>
                        <li>Monitor customer progress and adjust treatment plans accordingly.</li>
                        <li>Ensure customer privacy and confidentiality.</li>
                        <li>Encourage regular communication and follow-ups to track improvements.</li>
                    </ul>
                </section>
                <section className="section">
                    <h2 className="section-title">Ready to Get Started?</h2>
                    <p>Explore the dashboard to view customer data and take necessary actions. If you have any questions or need assistance, feel free to reach out to our support team.</p>
                    
                    <Link to="/Aappointment" className="button">Go to Dashboard</Link>
                </section>
            </main>
        </div>
    );
}

export default DoctorHomePage;
