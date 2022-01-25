import {
  BookmarkBorderOutlined,
  FavoriteBorderOutlined,
  ModeCommentOutlined,
  MoreHoriz,
  Telegram,
} from "@material-ui/icons";
import React from "react";
import ProfileComp from "../../../FUC/ProfileComp";
import "./singleMainComp.scss";
const SingleMainComp = () => {
  return (
    <div className="singleMainComp">
      <div className="singleMainComp_top">
        <div className="singleMainComp_profile_n_logo">
          <ProfileComp />
        </div>
        <div className="singleMainComp_t_dot">
          <MoreHoriz />
        </div>
      </div>
      <div className="singleMainComp_media_file">
        <img
          src="https://images.pexels.com/photos/2437197/pexels-photo-2437197.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt=""
        />
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
        <div className="singleMainComp_l_count">5,732 likes</div>
        <div className="singleMainComp_description">
          <span className="user_namesmc">phrasalidiomatic</span>
          <span>Share with your friends and family👥</span>
        </div>
        <div className="singleMainComp_description_time">1 DAY AGO</div>
      </div>
    </div>
  );
};

export default SingleMainComp;
