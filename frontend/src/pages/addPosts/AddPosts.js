import { InsertPhotoOutlined } from "@material-ui/icons";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPosts } from "../../context/actions/postsAction";
import storage from "../../firebase/firebaseStore";
import "./addPosts.scss";

const AddPosts = () => {
  const dispatch = useDispatch();
  const [media, setMedia] = useState("");
  const [caption, setCaption] = useState("");

  const upload = (image) => {
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, `Posts/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
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
          setMedia(downloadURL);
        });
      }
    );
  };

  const handleMediaInput = (e) => {
    upload(e.target.files[0]);
  };

  const handleCreatePost = () => {
    dispatch(createPosts({ media, caption }));
  };

  return (
    <div className="add_posts">
      <div className="add_posts_container">
        <div className="add_posts_container_top">
          <h3>Create new post</h3>
          <button onClick={handleCreatePost}>Share</button>
        </div>
        {media && (
          <div className="add_posts_container_img">
            <img src={media} alt="" />
          </div>
        )}
        {!media && (
          <div className="add_posts_container_icons">
            <InsertPhotoOutlined className="add_posts_container_icon" />
          </div>
        )}
        <div className="post_media_input">
          <label htmlFor="postMedia">Select from computer</label>
          <input
            type="file"
            name="media"
            onChange={handleMediaInput}
            id="postMedia"
          />
        </div>
        <div className="post_caption">
          <textarea
            name=""
            id=""
            required
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
          />
        </div>
      </div>
    </div>
  );
};

export default AddPosts;
