import React, { useState } from 'react';

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    if (name === 'subject') setSubject(value);
    if (name === 'message') setMessage(value);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    let dataSend = {
        email:email,
        subject:subject,
        message:message
    }
    try {
      console.log(dataSend)
      const res = await fetch("http://localhost:5000/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSend),
      });
      if(res.status>199 && res.status<300){
          alert("Send successfully");
      } else {
          throw new Error('Failed to send email');
      }
    } catch(err) {
      console.error(err);
      alert('Failed to send email');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" name="email" value={email} onChange={handleInputChange} />
      </label>
      <label>
        Subject:
        <input type="text" name="subject" value={subject} onChange={handleInputChange} />
      </label>
      <label>
        Message:
        <textarea name="message" value={message} onChange={handleInputChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default ContactForm;