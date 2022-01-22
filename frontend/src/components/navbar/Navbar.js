import {
  AccountCircle,
  Explore,
  FavoriteBorderOutlined,
  HomeOutlined,
  Telegram,
} from "@material-ui/icons";
import React from "react";
import "./navbar-style.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""
          />
        </div>
        <div className="search">
          <input type="text" placeholder="Search" />
        </div>
        <div className="icons">
          <div>
            <HomeOutlined className="icon" />
          </div>
          <div>
            <Telegram className="icon" />
          </div>
          <div>
            <Explore className="icon" />
          </div>
          <div>
            <FavoriteBorderOutlined className="icon" />
          </div>
          <div className="profile">
            <AccountCircle className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
