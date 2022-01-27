import React from "react";
import Auth from "../../../components/auth/Auth";

const Signup = ({ onNext }) => {
  return (
    <div className="signup">
      <Auth isSignPage={true} onNext={onNext} />
    </div>
  );
};

export default Signup;
