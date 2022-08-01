import React, { useState } from "react";
import "./setUserInfo.scss";
const SetUserInfo = () => {
  const [profileImg, setProfileImg] = useState(
    "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  );
  return (
    <div className="setUserInfo">
      <div className="setUserInfo_container">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        <div className="set_profile_img">
          <img src={profileImg} alt="" />
        </div>
        <input
          type="file"
          onChange={(e) => setProfileImg(e.target.files[0])}
          className="set_input_file"
        />
        <textarea
          className="set_profile_textarea"
          type="text"
          placeholder="Bio..."
        />
        <button>Next</button>
      </div>
    </div>
  );
};

export default SetUserInfo;
