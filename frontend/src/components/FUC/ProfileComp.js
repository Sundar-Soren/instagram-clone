import React from "react";
import "./profileComp.scss";
const ProfileComp = ({ follow }) => {
  return (
    <div className="profileComp">
      <img
        src="https://images.unsplash.com/photo-1630125193995-cd224e2fba7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGN1dGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        alt=""
      />
      <p>name profile</p>
      {follow && <span>Follow</span>}
    </div>
  );
};

export default ProfileComp;
