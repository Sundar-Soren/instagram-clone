import {
  AccountCircle,
  AddBoxOutlined,
  Close,
  Explore,
  FavoriteBorderOutlined,
  HomeOutlined,
  Telegram,
} from "@material-ui/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddPosts from "../../pages/addPosts/AddPosts";
import "./navbar-style.scss";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPC, setShowPC] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };
  const showPostsComponent = () => {
    document.body.style.overflow = "hidden";
    setShowPC(true);
  };

  const notShowPostsComponent = () => {
    document.body.style.overflow = "scroll";
    setShowPC(false);
  };

  return (
    <>
      {showPC && (
        <div className="add_post_comp">
          <div className="close_post_model" onClick={notShowPostsComponent}>
            <Close style={{ fontSize: "2.5rem" }} />
          </div>
          <div className="post_com_call">
            <AddPosts />
          </div>
        </div>
      )}

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
              <span onClick={showPostsComponent}>
                <AddBoxOutlined className="icon" />
              </span>
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
    </>
  );
};

export default Navbar;
