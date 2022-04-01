import axios from "axios";
import React, { useEffect, useState } from "react";

const SingleMainComment = ({ postId }) => {
  const [comment, setComment] = useState([]);
  useEffect(() => {
    const fetchComment = async (postId) => {
      try {
        const res = await axios.get(`/comment/${postId}`);
        setComment(res.data.comment);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComment(postId);
  }, [postId]);
  return (
    <>
      {comment &&
        comment.map((data) => (
          <div className="display_comment">
            <div className="comment_user_name">{data.userName}</div>
            <p>{data.comment}</p>
          </div>
        ))}
    </>
  );
};

export default SingleMainComment;
