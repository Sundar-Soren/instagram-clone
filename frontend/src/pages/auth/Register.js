import { useState } from "react";
import SetUserInfo from "./signup/SetUserInfo";
import Signup from "./signup/Signup";
const steps = {
  1: Signup,
  2: SetUserInfo,
};
const Register = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];
  const onNext = () => {
    setStep(step + 1);
  };
  return (
    <div className="register">
      <Step onNext={onNext} />
    </div>
  );
};

export default Register;
