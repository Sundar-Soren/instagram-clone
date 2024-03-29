import {
  BookmarkBorderOutlined,
  EmojiEmotions,
  FavoriteBorderOutlined,
  ModeCommentOutlined,
  MoreHoriz,
  Telegram,
} from "@material-ui/icons";
import React, { useState } from "react";
import "./singleMainComp.scss";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostById,
  postCommentCall,
} from "../../../../context/actions/postsAction";
import POPUPPostsDetails from "../../../postsPopupDetail/POPUPPostsDetails";
import SingleMainComment from "./SingleMainComment";
const SingleMainComp = ({ feedPost }) => {
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [showPOPUPP, setShowPOPUPP] = useState(false);

  const dispatch = useDispatch();

  // const postComment = (e) => {
  //   e.preventDefault();
  //   dispatch(
  //     postCommentCall({
  //       postId: feedPost._id,
  //       comment,
  //       user: user._id,
  //       userName: user.username,
  //     })
  //   );
  // };
  const singlePostDetail = (postId) => {
    setShowPOPUPP(true);
    dispatch(getPostById(postId));
  };

  return (
    <>
      <div className="singleMainComp">
        <div className="singleMainComp_top">
          <Link to={`/${feedPost.post_user[0].username}`} className="link">
            <div className="singleMainComp_profile_n_logo">
              <img src={feedPost.post_user[0].avatar} alt="" />
              <p>{feedPost.post_user[0].username}</p>
            </div>
          </Link>
          <div className="singleMainComp_t_dot">
            <MoreHoriz />
          </div>
        </div>
        <div
          className="singleMainComp_media_file"
          onClick={() => singlePostDetail(feedPost._id)}
        >
          <img src={feedPost.media} alt="" />
        </div>
        <div className="singleMainComp_activity">
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
          <div className="singleMainComp_l_count">
            {feedPost && <>{feedPost.likes.length} Likes</>}
          </div>
          <div className="singleMainComp_description">
            <span className="user_namesmc">
              {feedPost.post_user[0].username}
            </span>
            <span>{feedPost.caption}</span>
          </div>
          <div className="view_comment_count">
            <p onClick={() => singlePostDetail(feedPost._id)}>
              View all {feedPost.comments.length} comments
            </p>
          </div>
          <div className="singleMainComp_description_time">
            {format(feedPost.createdAt)}
          </div>

          {/* <SingleMainComment postId={feedPost._id} /> */}

          {/* <div className="add_comment">
            <div className="add_icon">
              <EmojiEmotions />
            </div>
            <form onSubmit={postComment}>
              <input
                type="text"
                placeholder="Add a comment..."
                onChange={(e) => setComment(e.target.value)}
              />
              <button type="submit" onClick={postComment}>
                Post
              </button>
            </form>
          </div> */}
        </div>
      </div>
      {showPOPUPP && <POPUPPostsDetails setShowPOPUPP={setShowPOPUPP} />}
    </>
  );
};

export default SingleMainComp;
