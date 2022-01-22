import React from "react";
import "./authStyle.scss";
import { Facebook } from "@material-ui/icons";

const Auth = ({ isSignPage }) => {
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
          <input type="text" placeholder="Mobile Number Or Email" />
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
          <input type="password" placeholder="Password" />
          <button type="submit" className={isSignPage ? "" : "not-signup-page"}>
            Sign up
          </button>
          <button
            type="submit"
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
      <div className={isSignPage ? "log-in" : "not-signup-page"}>
        <p>
          Have an account? <span>Log in</span>
        </p>
      </div>
      {/* <div className={isSignPage ? "not-signup-page" : "login-page"}>
        <p>
          Don't have an account? <span>Sign up</span>
        </p>
      </div> */}
    </div>
  );
};

export default Auth;
