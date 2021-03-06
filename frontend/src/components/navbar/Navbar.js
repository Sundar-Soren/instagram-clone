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
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CLEAR_POST_SUCCESS_AND_ERROR } from "../../context/constants/postConstant";
import AddPosts from "../../pages/addPosts/AddPosts";
import "./navbar-style.scss";

const Navbar = () => {
  const [showPC, setShowPC] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const showPostsComponent = () => {
    document.body.style.overflow = "hidden";
    setShowPC(true);
  };

  const notShowPostsComponent = () => {
    document.body.style.overflow = "scroll";
    setShowPC(false);
    dispatch({ type: CLEAR_POST_SUCCESS_AND_ERROR });
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

      <div className={"navbar"}>
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
            {user && (
              <>
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
              </>
            )}
            <div className="profile">
              {user ? (
                <Link to={`/${user.username}`} className="link">
                  <AccountCircle className="icon" />
                </Link>
              ) : (
                <div className="weiofhjdc">
                  <Link to="/signup" className="link">
                    <div>Sign Up</div>
                  </Link>
                  <Link to="/login" className="link">
                    <button className="login_nav">Login</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
