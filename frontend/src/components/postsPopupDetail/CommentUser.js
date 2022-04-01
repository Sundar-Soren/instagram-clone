import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./commentUser.scss";

const CommentUser = ({ data }) => {
  const [avatar, setAvatar] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    const getProfilePic = async (userId) => {
      try {
        const { data } = await axios.get(`/user/profilePic/${userId}`);
        setAvatar(data.profilePic);
      } catch (error) {
        console.log(error.message);
      }
    };
    getProfilePic(data.user);
  }, [data]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <div className="CommentUser">
      <div className="CU_contaienr">
        <img src={avatar} alt="" />
        <p className="commetterName">{data.userName}</p>
        <p className="comment_content" ref={scrollRef}>
          {data.comment}
        </p>
      </div>
    </div>
  );
};

export default CommentUser;
