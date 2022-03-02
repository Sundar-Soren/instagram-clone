import React, { useEffect, useState } from "react";
import "./profilefetchById.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  followingUserCall,
  unfollowingUserCall,
} from "../../context/actions/userActions";
import { Link } from "react-router-dom";
const ProfileFetchById = ({ userId, profile }) => {
  const dispatch = useDispatch();
  const [singleuser, setSingleUser] = useState(null);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    const getUserById = async (userId) => {
      try {
        const res = await axios.get(`/user/${userId}`);
        setSingleUser(res.data.user);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserById(userId);
  }, [userId]);

  const handleFollow = (followingId) => {
    dispatch(followingUserCall(followingId));
  };
  const handleUnfollowing = (unfollowingId) => {
    dispatch(unfollowingUserCall(unfollowingId));
  };
  return (
    <>
      {singleuser && (
        <div className="profilefetchById">
          <div className="profilefetchById_container">
            <Link to={`/${singleuser.username}`} className="link">
              <img src={singleuser.avatar} alt="" />
            </Link>
            <Link to={`/${singleuser.username}`} className="link">
              <div className="profilefetchById_name">
                <p>{singleuser.username}</p>
                <p>{singleuser.fullname}</p>
              </div>
            </Link>
            {user && user.following.includes(singleuser._id) && (
              <button onClick={() => handleUnfollowing(singleuser._id)}>
                unfollow
              </button>
            )}
            {user && !user.following.includes(singleuser._id) && (
              <button
                onClick={() => handleFollow(singleuser._id)}
                className="jwfhjcwedw"
              >
                follow
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileFetchById;
