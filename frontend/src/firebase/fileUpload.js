import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "./firebaseStore";

export const firebaseUpload = (image, DirName) => {
  let urlValue = "";
  const fileName = new Date().getTime() + image.name;
  const storageRef = ref(storage, `${DirName}/${fileName}`);
  const uploadTask = uploadBytesResumable(storageRef, image);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      switch (snapshot.state) {
        case "paused":
          break;
        case "running":
          break;
      }
    },
    (error) => {
      console.log("Firebase Upload error" + error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        urlValue = downloadURL;
        return urlValue;
      });
    }
  );
  return urlValue;
};
