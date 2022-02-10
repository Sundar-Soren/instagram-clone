import { Facebook } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../context/actions/userActions";
import "./loginPopup.scss";

const LoginPopup = ({ setLoginpopup }) => {
  const dispatch = useDispatch();
  const [userl, setUserl] = useState({
    email: "",
    password: "",
  });

  const handleModelClose = (e) => {
    if (e.target.classList.contains("LoginPopup")) {
      setLoginpopup(false);
      document.body.style.overflow = "auto";
    }
  };
  const handleBackdrop = () => {
    document.body.style.overflow = "auto";
  };
  const handleSignupChange = (e) => {
    setUserl({ ...userl, [e.target.name]: e.target.value });
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userl.email, userl.password));
  };
  return (
    <div className="LoginPopup" onClick={handleModelClose}>
      <div className="container">
        <div className="auth-logo-image">
          <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""
          />
        </div>

        <button className="not-signup-page">
          <Facebook className="icon" /> Log in with Facebook
        </button>
        <div className="not-signup-page">
          <span className="line"></span>
          <span className="or">OR</span>
          <span className="line"></span>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            required
            onChange={handleSignupChange}
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            onChange={handleSignupChange}
          />

          <button
            type="submit"
            onClick={handleLoginSubmit}
            className="login-page"
          >
            Log In
          </button>
        </form>

        <span className="login-page">Forgot Password?</span>
        <p>
          Don't have an account?
          <Link to="/signup" onClick={handleBackdrop}>
            <span>Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
