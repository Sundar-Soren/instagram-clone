import {
  BookmarkBorderOutlined,
  FavoriteBorderOutlined,
  ModeCommentOutlined,
  MoreHoriz,
  Telegram,
} from "@material-ui/icons";
import React from "react";
import "./singleMainComp.scss";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
const SingleMainComp = ({ feedPost }) => {
  console.log(feedPost);
  return (
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
      <div className="singleMainComp_media_file">
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
        {/* <div className="singleMainComp_l_count">
          {feedPost.likes ? feedPost.likes.length() : ""}
        </div> */}
        <div className="singleMainComp_description">
          <span className="user_namesmc">{feedPost.post_user[0].username}</span>
          <span>{feedPost.caption}</span>
        </div>
        <div className="singleMainComp_description_time">
          {format(feedPost.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default SingleMainComp;
