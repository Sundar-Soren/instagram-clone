import React from "react";
import { useSelector } from "react-redux";
import ProfileFetchById from "../../FUC/ProfileFetchById";
import "./followingList.scss";
const FollowingList = ({ setFollowingListModel }) => {
  const { profile } = useSelector((state) => state.profile);

  const handleCloseModel = (e) => {
    if (e.target.classList.contains("following_list")) {
      setFollowingListModel(false);
      document.body.style.overflow = "scroll";
    }
  };
  return (
    <div className="following_list" onClick={handleCloseModel}>
      <div className="followingList_container">
        <h4>Following</h4>
        <div className="following_list_call">
          {profile &&
            profile.following.map((userId, i) => (
              <ProfileFetchById userId={userId} profile={profile} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FollowingList;
