import React, { useState } from "react";
import '../Styles/Login.css';
import { Link, useNavigate,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {useAuth} from '../Auth/useAuth'

const Login = () => {
  const { userInfo } = useAuth();
  const location = useLocation();
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // if(!isSign) toast.info("Please Sign in first")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json()
        toast.success(data.category+ " signed in successfully!");
        userInfo(data)
        if (location.pathname === '/login') {
          navigation('/')
        } else {
          navigation(location.pathname)
        }
      } else {
        if (response.statusText === "Not Found") {
          toast.error("Email not registered")
        } else if (response.statusText === "Unauthorized") {
          toast.error("Wrong password");
        }
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="p-5 shadow-lg rounded-3 mb-4 boxx"> {/* Added mb-4 for bottom margin */}
            <h1 className="text-primary mb-4 text-center">Login</h1>
            <form onSubmit={handleSubmit} method="POST">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  style={{ width: "100%" }}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  style={{ width: "100%" }}
                  required
                />
              </div>
              <div className="d-flex align-items-center justify-content-center mt-5">
                <button
                  type="submit"
                  className="btn btn-primary w-50 py-2"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="row row-cols-7 g-3 mt-2 icon_box">
              <div className="col text-end">
                <button type="button" className="btn btn-primary">
                  <i className="fab fa-google text-white"></i>
                </button>
              </div>
              <div className="col">
                <button type="button" className="btn btn-primary">
                  <i className="fab fa-github text-white"></i>
                </button>
              </div>
            </div>
            <div className="mt-4 text-center">
              New user?{" "}
              <Link to="/register" className="text-decoration-none fw-bold">
                Register Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
