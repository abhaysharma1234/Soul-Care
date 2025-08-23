import React from 'react';
import './Astyle/Afooter.css';

function Footer() {
    return (
        <>
        <div className='footer'>
        <div className='footerA'>
            <div className='footerContentLeft'>
            <h3>Get Help</h3>
                    <p>If you or someone you know is struggling with mental health issues, don't hesitate to seek help.</p>
                    <p>Contact a mental health professional or call a helpline for support.</p>
            </div>
            <div className='footerContentright'>
            <h3>For Doctors</h3>
                    <p>When handling patients:</p>
                    <ul>
                        <li>Listen actively and empathetically.</li>
                        <li>Provide a safe and non-judgmental environment.</li>
                        <li>Respect patient confidentiality and privacy.</li>
                        <li>Offer support and guidance tailored to the individual's needs.</li>
                    </ul>
            </div>
        </div>
            <div className="footer-bottom">
                <p>© 2024 Harmony. All rights reserved.</p>
            </div>
        </div>
        </>
    );
}

export default Footer;
