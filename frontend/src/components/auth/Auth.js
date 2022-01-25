import React, { useState } from "react";
import "./authStyle.scss";
import { Facebook } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../context/actions/userActions";

const Auth = ({ isSignPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
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
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="text"
            placeholder="Full Name"
            className={isSignPage ? "" : "not-signup-page"}
          />
          <input
            type="text"
            placeholder="Username"
            className={isSignPage ? "" : "not-signup-page"}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={isSignPage ? "" : "not-signup-page"}>
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
