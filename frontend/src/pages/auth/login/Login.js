import React from "react";
import Auth from "../../../components/auth/Auth";

const Login = () => {
  return (
    <div className="login">
      <Auth isSignPage={false} />
    </div>
  );
};

export default Login;
