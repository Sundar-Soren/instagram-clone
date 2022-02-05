import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../context/actions/userActions";
import "./profileSetting.scss";
const PorfileSetting = ({ setShowsetting }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const handleCloseModel = (e) => {
    if (e.target.classList.contains("containerPS")) {
      setShowsetting(false);
    }
  };

  return (
    <div className="containerPS" onClick={handleCloseModel}>
      <div className="profile_setting">
        <div onClick={handleLogout}>Logout</div>
        <div onClick={() => setShowsetting(false)}>Cencel</div>
      </div>
    </div>
  );
};

export default PorfileSetting;
