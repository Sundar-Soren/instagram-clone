import React, { useState } from "react";
import "./authStyle.scss";
import { Facebook } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, register } from "../../context/actions/userActions";

const Auth = ({ isSignPage, onNext }) => {
  const dispatch = useDispatch();
  const [signupUser, setSignupUser] = useState({
    email: "",
    fullname: "",
    username: "",
    password: "",
  });

  const handleSignupChange = (e) => {
    setSignupUser({ ...signupUser, [e.target.name]: e.target.value });
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(signupUser.email, signupUser.password));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // onNext();
    dispatch(register(signupUser));
  };

  return (
    <div className="auth">
      <div className="container">
        <div className="auth-logo-image">
          <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""
          />
        </div>
        <span
          className={isSignPage ? "auth-notice-heading" : "not-signup-page"}
        >
          Sign up to see photos and videos from your friends.
        </span>
        <button className={isSignPage ? "" : "not-signup-page"}>
          <Facebook className="icon" /> Log in with Facebook
        </button>
        <div className={isSignPage ? "or-separation" : "not-signup-page"}>
          <span className="line"></span>
          <span className="or">OR</span>
          <span className="line"></span>
        </div>
        <form>
          <input
            type="email"
            name="email"
            required
            onChange={handleSignupChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="fullname"
            required
            placeholder="Full Name"
            className={isSignPage ? "" : "not-signup-page"}
            onChange={handleSignupChange}
          />
          <input
            type="text"
            name="username"
            required
            placeholder="Username"
            className={isSignPage ? "" : "not-signup-page"}
            onChange={handleSignupChange}
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
            onClick={handleSignupSubmit}
            className={isSignPage ? "" : "not-signup-page"}
          >
            Sign up
          </button>
          <button
            type="submit"
            onClick={handleLoginSubmit}
            className={isSignPage ? "not-signup-page" : "login-page"}
          >
            Log In
          </button>
        </form>
        <span className={isSignPage ? "" : "not-signup-page"}>
          By signing up, you agree to our Terms , Data Policy and Cookies Policy
          .
        </span>
        <span className={isSignPage ? "not-signup-page" : "login-page"}>
          Forgot Password?
        </span>
      </div>
      <div className={!isSignPage ? "signup-show" : "signup-notshow"}>
        <p>
          Have an account?{" "}
          <Link to="/login">
            <span>Log in</span>
          </Link>
        </p>
      </div>
      <div className={isSignPage ? "signup-show" : "signup-notshow"}>
        <p>
          Don't have an account?
          <Link to="/signup">
            <span>Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
