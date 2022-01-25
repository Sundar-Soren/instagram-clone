import {
  AccountCircle,
  Explore,
  FavoriteBorderOutlined,
  HomeOutlined,
  Telegram,
} from "@material-ui/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar-style.scss";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };
  return (
    <div className={isScrolled ? "navbar_scroll" : "navbar"}>
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
            <Link to="/" className="link">
              <HomeOutlined className="icon" />
            </Link>
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
            <Link to="/profile" className="link">
              <AccountCircle className="icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
