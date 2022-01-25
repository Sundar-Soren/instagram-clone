import React, { useEffect, useState } from "react";
import "./profile.scss";
import Navbar from "../../components/navbar/Navbar";
import { BookmarkBorderOutlined, GridOn, Settings } from "@material-ui/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import PorfileSetting from "../../components/profile-component/profile-setting/PorfileSetting";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showsetting, setShowsetting] = useState(false);

  useEffect(() => {
    const getMyPosts = async () => {
      try {
        const res = await axios.get("/post/getmy");
        setPosts(res.data.posts);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMyPosts();
  }, []);
  console.log(posts);
  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="profile_info">
          <div className="profile_pic">
            <div className="profile_pic_con">
              <img
                src="https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
              />
            </div>
          </div>
          <div className="profile_info_content">
            <div className="profile_info_content_con">
              <div className="profile_user">
                <p>{user.username}</p>
                <button>Edit Profile</button>
                <div
                  onClick={() => setShowsetting(true)}
                  style={{ cursor: "pointer" }}
                >
                  <Settings />
                </div>
              </div>
              <div className="profile_dynamic_data">
                <p>0 posts</p>
                <p>1 follower</p>
                <p>8 following</p>
              </div>
              <div className="profile_fullname">{user.fullname}</div>
              <div className="profile_bio">
                🌐|| Hello World🌍 ⭕|| Trying to know how to communicate with
                Machine
              </div>
            </div>
          </div>
        </div>
        <div className="my_content_nav">
          <div>
            <GridOn />
            POSTS
          </div>
          <div>
            <BookmarkBorderOutlined />
            SAVED
          </div>
        </div>
        <div className="profile_media_container">
          {posts &&
            posts.map((post) => (
              <div className="profile_media">
                <img src={post.media} alt="" />
              </div>
            ))}
        </div>
      </div>
      ;{showsetting && <PorfileSetting setShowsetting={setShowsetting} />}
    </>
  );
};

export default Profile;
