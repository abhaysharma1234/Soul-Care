import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import UserHistory from "./Pages/UserHistory";
import Legal from "./Pages/Legal";
import NotFound from "./Pages/NotFound";
import Appointment from "./Pages/Appointment";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Doctors from "./Pages/Doctors";
import About from "./Components/About";
import Testpage from "./Pages/Testpage";
import Test from "./Pages/Test";
import Footer from "./Components/Footer";
import Anavbar from "./Components/Admin/Anavbar"
import Aappointment from "./Components/Admin/Aappointment";
import AHome from "./Components/Admin/AHome";
import Afooter from "./Components/Admin/Afooter";
import { useAuth } from "./Auth/useAuth";
import { ToastContainer } from "react-toastify";
import Notyet from "./Pages/Notyet";
import NoAppoint from "./Pages/NoAppoint";


function App() {
  const { isSign,isAdmin } = useAuth();
  return (
    <div className="App">
      <Router>
        {isAdmin? <Anavbar />
          :
          <Navbar />}
        <Routes>
          <Route path="/" element={isAdmin?<AHome/>:<Home />} />
          <Route path="/Health-Plus" element={isAdmin?<AHome/>:<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/userhistory" element={isSign ? <UserHistory />:<Login />} />
          <Route path="/legal" element={<Legal />} />
          <Route
            path="/appointment"
            element={isSign ? <Appointment /> : <Login />}
          />
          <Route path="/Aappointment" element={isSign ? <Aappointment />: <Login/>} />
          <Route path="/doctor" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/testpage" element={isSign ? <Testpage /> : <Login />} />
          <Route path="/test" element={isSign ? <Test /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notyet" element={<Notyet />} />
          <Route path="/noappoint" element={<NoAppoint />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {isAdmin? <Afooter /> :
        <Footer/>}
      </Router>
      <ToastContainer
        autoClose={1000}
        limit={1}
        closeButton={false}
        position="top-center"
      />
    </div>
  );
}

export default App;
