import React, { useEffect, useState } from "react";
import "./profilefetchById.scss";
import axios from "axios";
const ProfileFetchById = ({ userId }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUserById = async (userId) => {
      try {
        const res = await axios.get(`/user/${userId}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserById(userId);
  }, [userId]);
  return (
    <>
      {user && (
        <div className="profilefetchById">
          <div className="profilefetchById_container">
            <img src={user.avatar} alt="" />
            <div className="profilefetchById_name">
              <p>{user.username}</p>
              <p>{user.fullname}</p>
            </div>
            <button>following</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileFetchById;
