import React, { useEffect, useState } from "react";
import "./profile.scss";
import Navbar from "../../components/navbar/Navbar";
import { BookmarkBorderOutlined, GridOn, Settings } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import PorfileSetting from "../../components/profile-component/profile-setting/PorfileSetting";
import {
  followingUserCall,
  getUserProfile,
  unfollowingUserCall,
  updateUser,
} from "../../context/actions/userActions";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase/firebaseStore";
import { useParams } from "react-router-dom";
import FollowingList from "../../components/profile-component/followingList/FollowingList";
import FollowersList from "../../components/profile-component/followingList copy/FollowersList";
import LoginPopup from "../../components/FUC/LoginPopup";
import POPUPPostsDetails from "../../components/postsPopupDetail/POPUPPostsDetails";
import { getPostById } from "../../context/actions/postsAction";

const Profile = () => {
  const { username } = useParams();

  const { user } = useSelector((state) => state.user);
  const { profile } = useSelector((state) => state.profile);
  const { posts } = useSelector((state) => state.posts);
  const [showsetting, setShowsetting] = useState(false);
  const [followingListModel, setFollowingListModel] = useState(false);
  const [followerListModel, setFollowerListModel] = useState(false);
  const [follwerCount, setFollwerCount] = useState(0);
  const [loginpopup, setLoginpopup] = useState(false);
  const [showPOPUPP, setShowPOPUPP] = useState(false);
  const dispatch = useDispatch();

  const followingListModelFunctionCall = () => {
    setFollowingListModel(true);
    document.body.style.overflow = "hidden";
  };
  const followerListModelFunctionCall = () => {
    setFollowerListModel(true);
    document.body.style.overflow = "hidden";
  };
  const loginPopupCall = () => {
    setLoginpopup(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    dispatch(getUserProfile(username));
    setFollowingListModel(false);
    setFollowerListModel(false);
    document.body.style.overflow = "auto";
  }, [username, dispatch]);

  const handleAvatarUpdate = (e) => {
    const fileName = new Date().getTime() + e.target.files[0].name;
    const storageRef = ref(storage, `Avatar/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

  const handleFollow = (followingId) => {
    dispatch(followingUserCall(followingId));
  };
  const handleUnfollowing = (unfollowingId) => {
    dispatch(unfollowingUserCall(unfollowingId));
  };

  const singlePostDetail = (postId) => {
    setShowPOPUPP(true);
    dispatch(getPostById(postId));
  };
  return (
    <>
      <Navbar />
      {profile && (
        <div className="profile">
          <div className="profile_info">
            <div className="profile_pic">
              <div className="profile_pic_con">
                <img
                  src={
                    profile.avatar
                      ? profile.avatar
                      : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                  }
                  alt="avatar"
                />
                {user && user._id === profile._id && (
                  <input
                    type="file"
                    name="avatar"
                    id=""
                    onChange={handleAvatarUpdate}
                  />
                )}
              </div>
            </div>
            <div className="profile_info_content">
              <div className="profile_info_content_con">
                <div className="profile_user">
                  <p>{profile.username}</p>
                  {user && user._id === profile._id && (
                    <button>Edit Profile</button>
                  )}
                  {user &&
                    user._id !== profile._id &&
                    !user.following.includes(profile._id) && (
                      <button
                        className="follow"
                        onClick={() => handleFollow(profile._id)}
                      >
                        Follow
                      </button>
                    )}
                  {user &&
                    user._id !== profile._id &&
                    user.following.includes(profile._id) && (
                      <button
                        className="unfollow"
                        onClick={() => handleUnfollowing(profile._id)}
                      >
                        Unfollow
                      </button>
                    )}
                  {user && user._id === profile._id && (
                    <div
                      onClick={() => setShowsetting(true)}
                      style={{ cursor: "pointer" }}
                    >
                      <Settings />
                    </div>
                  )}
                </div>
                <div className="profile_dynamic_data">
                  <p>{profile.posts} posts</p>
                  {user ? (
                    <p onClick={followerListModelFunctionCall}>
                      {/* {profile.follower.length} follower */}
                      {profile.follower ? profile.follower.length : 0} follower
                    </p>
                  ) : (
                    <p onClick={loginPopupCall}>
                      {profile.follower ? profile.follower.length : 0} follower
                    </p>
                  )}
                  {user ? (
                    <p onClick={followingListModelFunctionCall}>
                      {profile.following ? profile.following.length : 0}{" "}
                      following
                    </p>
                  ) : (
                    <p onClick={loginPopupCall}>
                      {profile.following ? profile.following.length : 0}{" "}
                      following
                    </p>
                  )}
                </div>
                <div className="profile_fullname">{profile.fullname}</div>
                <div className="profile_bio">{profile.bio}</div>
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
              posts.map((post, i) => (
                <div
                  className="profile_media"
                  key={i}
                  onClick={() => singlePostDetail(post._id)}
                >
                  <img src={post.media} alt="" />
                </div>
              ))}
          </div>
        </div>
      )}
      {showsetting && <PorfileSetting setShowsetting={setShowsetting} />}
      {followingListModel && (
        <FollowingList setFollowingListModel={setFollowingListModel} />
      )}
      {followerListModel && (
        <FollowersList setFollowerListModel={setFollowerListModel} />
      )}
      {loginpopup && !user && <LoginPopup setLoginpopup={setLoginpopup} />}
      {showPOPUPP && <POPUPPostsDetails setShowPOPUPP={setShowPOPUPP} />}
    </>
  );
};

export default Profile;
