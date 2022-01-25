import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../context/actions/userActions";
import "./profileSetting.scss";
const PorfileSetting = ({ setShowsetting }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="profile_setting">
      <div onClick={handleLogout}>Logout</div>
      <div onClick={() => setShowsetting(false)}>Cencel</div>
    </div>
  );
};

export default PorfileSetting;
