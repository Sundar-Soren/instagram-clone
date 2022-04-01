import {
  BookmarkBorderOutlined,
  EmojiEmotions,
  FavoriteBorderOutlined,
  ModeCommentOutlined,
  MoreHoriz,
  Telegram,
} from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createSPcomment } from "../../context/actions/postsAction";
import CommentUser from "./CommentUser";
import { format } from "timeago.js";

import "./postsPopupDetail.scss";
const POPUPPostsDetails = ({ setShowPOPUPP }) => {
  const handleClose = (e) => {
    if (e.target.classList.contains("postsPopupDetail")) {
      setShowPOPUPP(false);
    }
  };
  const { singlePost } = useSelector((state) => state.singlePost);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [spUser, setSpUser] = useState(null);
  useEffect(() => {
    const getUsetInfo = async (userId) => {
      try {
        const { data } = await axios.get(`/user/${userId}`);
        setSpUser(data.user);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUsetInfo(singlePost.user);
  }, [singlePost]);

  const postComment = (e) => {
    e.preventDefault();
    dispatch(
      createSPcomment({
        postId: singlePost._id,
        comment,
        user: user._id,
        userName: user.username,
      })
    );
    setComment("");
  };

  return (
    <>
      {singlePost && spUser && (
        <div className="postsPopupDetail" onClick={handleClose}>
          <div className="postsPopupDetail_container">
            <div className="PPD_left">
              <img src={singlePost.media} alt="" />
            </div>
            <div className="PPD_right">
              <div className="PPD_right_container">
                <div className="singleMainComp_top">
                  <Link to={`/${spUser.username}`} className="link">
                    <div className="singleMainComp_profile_n_logo">
                      <img src={spUser.avatar} alt="" />
                      <p>{spUser.username}</p>
                    </div>
                  </Link>
                  <div className="singleMainComp_t_dot">
                    <MoreHoriz />
                  </div>
                </div>
                <div className="singleMainComp_description">
                  <span className="user_namesmc">englishpeaks </span>
                  <span>{singlePost.caption}</span>
                </div>
                <div className="commentLists">
                  {singlePost.comments &&
                    singlePost.comments.map((data) => (
                      <CommentUser data={data} />
                    ))}
                </div>
                <div className="singleMainComp_activity_icons">
                  <div className="singleMainComp_activity_icon">
                    <FavoriteBorderOutlined className="singleMainComp_activity_iconr sss" />
                    <ModeCommentOutlined className="singleMainComp_activity_iconr" />
                    <Telegram className="singleMainComp_activity_iconr" />
                  </div>
                  <div className="singleMainComp_activity_save_icon">
                    <BookmarkBorderOutlined className="singleMainComp_activity_iconr" />
                  </div>
                </div>
                <div className="likeCount">
                  <p>{singlePost.likes && singlePost.likes.length} Likes</p>
                </div>
                <p className="timeAgo">{format(singlePost.createdAt)}</p>
                <div className="add_comment">
                  <div className="add_icon">
                    <EmojiEmotions />
                  </div>
                  <form onSubmit={postComment}>
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button type="submit" onClick={postComment}>
                      Post
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default POPUPPostsDetails;
