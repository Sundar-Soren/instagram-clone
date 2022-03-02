import React from "react";
import { useSelector } from "react-redux";
import ProfileFetchById from "../../FUC/ProfileFetchById";
import "./followersList.scss";
const FollowersList = ({ setFollowerListModel }) => {
  const { profile } = useSelector((state) => state.profile);

  const handleCloseModel = (e) => {
    if (e.target.classList.contains("following_list")) {
      setFollowerListModel(false);
      document.body.style.overflow = "scroll";
    }
  };
  return (
    <div className="following_list" onClick={handleCloseModel}>
      <div className="followingList_container">
        <h4>Follower</h4>
        <div className="following_list_call">
          {profile &&
            profile.follower.map((userId, i) => (
              <ProfileFetchById userId={userId} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FollowersList;
