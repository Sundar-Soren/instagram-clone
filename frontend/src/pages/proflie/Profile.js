import React, { useEffect, useState } from "react";
import "./profile.scss";
import Navbar from "../../components/navbar/Navbar";
import { BookmarkBorderOutlined, GridOn, Settings } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import PorfileSetting from "../../components/profile-component/profile-setting/PorfileSetting";
import { firebaseUpload } from "../../firebase/fileUpload";
import { updateUser } from "../../context/actions/userActions";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase/firebaseStore";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showsetting, setShowsetting] = useState(false);
  const dispatch = useDispatch();
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

  const handleAvatarUpdate = (e) => {
    const fileName = new Date().getTime() + e.target.files[0].name;
    const storageRef = ref(storage, `Avatar/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log("Firebase Upload error" + error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          dispatch(updateUser({ avatar: downloadURL }));
        });
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="profile_info">
          <div className="profile_pic">
            <div className="profile_pic_con">
              <img
                src={
                  user.avatar
                    ? user.avatar
                    : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                }
                alt="avatar"
              />
              <input
                type="file"
                name="avatar"
                id=""
                onChange={handleAvatarUpdate}
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
                <p>{user.posts} posts</p>
                <p>{user.follower} follower</p>
                <p>{user.following} following</p>
              </div>
              <div className="profile_fullname">{user.fullname}</div>
              <div className="profile_bio">{user.bio}</div>
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
