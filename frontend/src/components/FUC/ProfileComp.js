import React from "react";
import "./profileComp.scss";
import { useDispatch } from "react-redux";
import {
  followingUserCall,
  unfollowingUserCall,
} from "../../context/actions/userActions";
const ProfileComp = ({ follow, users, followingUser }) => {
  const dispatch = useDispatch();

  const handleFollow = (followingId) => {
    dispatch(followingUserCall(followingId));
  };
  const handleUnfollowing = (unfollowingId) => {
    dispatch(unfollowingUserCall(unfollowingId));
  };
  return (
    <>
      {users && (
        <div className="profileComp">
          <img src={users.avatar} alt="" />
          <p>{users.username}</p>
          {follow && !followingUser.includes(users._id) && (
            <span onClick={() => handleFollow(users._id)}>Follow</span>
          )}
          {followingUser.includes(users._id) && (
            <div onClick={() => handleUnfollowing(users._id)}>following</div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileComp;
