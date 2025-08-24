const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
// const formDataRouter = require('./user');

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require("dotenv").config({ path: '.env.local' });


const app = express();
const PORT = process.env.PORT || 5000;


// MongoDB connection from compass
// mongoose.connect(process.env.MONGODB_URI);

// MongoDB connection from atlas
mongoose.connect(process.env.MongoDbUri);

// Establishing connection to the database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// MongoDB schema and model
const userSchema = new mongoose.Schema({
    category: String,
    username: String,
    email: String,
    password: String,
    symptoms: String,
    score: String,
});
const appointmentSchema = new mongoose.Schema({
  userEmail: String,
  patientName: String,
  patientNumber: String,
  patientGender: String,
  appointmentTime: String,
  doctor: String,
  preferredMode: String
});

const User = mongoose.model('users', userSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);


// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

// Route to handle user signup
app.post('/register',  async (req, res) => {
  
    try {
      const { category,username, email, password,symptoms,score } = req.body;
      uname = username.charAt(0).toUpperCase() + username.slice(1);

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ category,username :uname, email, password: hashedPassword,symptoms,score });
      await user.save();
      res.status(201).send('User signed up successfully');
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Route to handle user signin
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send("Invalid password");
    }
    const data = {
      _id: user.id,
      category: user.category,
      username: user.username,
      email: user.email,
      symptoms: user.symptoms,
      score: user.score,
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).send("Internal server error");
  }
});

// Route to handle form submission
app.post('/submit-appointment', async (req, res) => {
  try {
      const { userEmail,patientName, patientNumber, patientGender, appointmentTime,doctor,preferredMode } = req.body;
      const appointment = new Appointment({ userEmail,patientName, patientNumber, patientGender, appointmentTime,doctor, preferredMode });
      await appointment.save();
      res.status(201).send('Appointment data saved successfully');
  } catch (error) {
      console.error('Error saving appointment data:', error);
      res.status(500).send('Internal server error');
  }
});

// Route for getting all apointments
app.get('/getappointment', async (req, res) => {
  try {
    const data = await Appointment.find();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for getting all user history
app.get("/gethistory", async (req, res) => {
  try {
    const { email } = req.query;
    const data = await Appointment.find({userEmail: email});
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// generating random meeting link
function generateRandomMeetLink() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const linkLength = 3; // Adjust the length of the random part of the link
  let meetLink = 'https://meet.google.com/';

  for (let i = 0; i < linkLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      meetLink += characters[randomIndex];
  }

  meetLink += '-';

  for (let i = 0; i < linkLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      meetLink += characters[randomIndex];
  }

  meetLink += '-';

  for (let i = 0; i < linkLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      meetLink += characters[randomIndex];
  }

  return meetLink;
}

// route for sending emails to the registered appointment
app.post("/sendEmail", async (req,res)=>{
  const {email,name} = req.body;
  try {
    const google_meet = generateRandomMeetLink();
    const send_to = email;
    const subject = "Appointment Scheduled";
    const message = `Hello ${name},\n\nYour appointment is scheduled on the chosen time.\n\nHere is your Google Meet link: ${google_meet}`;

    
    const mailOptions = {
            from: 'mahakalyogesh@gmail.com', 
            to: send_to,
            subject: subject,
            text: message,
        }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
          res.status(500).json({ success: false, message: 'Failed to send email' });
      } else {
          console.log('Email sent:', info.response);
          res.status(200).json({ success: true, message: 'Email sent successfully' });
      }
  });
    res.status(200).json({success:true, message:"Email sent"})
  } catch (error) {
    console.error("Error sending email:", error); 
    res.status(500).json({ success: false, message: "Failed to send email", error: error.message });
  }
})


// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
      user: process.env.SMTP_MAIL, 
      pass: process.env.SMTP_PASS
  },
  tls: {
      rejectUnauthorized: false
  }
});

// route for deleting the appointment form the db.
app.delete('/app_req/:id', async (req, res) => {
  try {
    const deletedDoc = await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Document deleted successfully', deletedDoc });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  // res.redirect('/Aappointment')
});

// route for tetsing the backend
app.get('/live', async (req, res) => {
  res.status(200).json({ message: 'backend is running successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
