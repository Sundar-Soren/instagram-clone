import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARS9CxHRllYXDCkktrQKx1nN3CzSixm7c",
  authDomain: "instagram-clone-f85d1.firebaseapp.com",
  projectId: "instagram-clone-f85d1",
  storageBucket: "instagram-clone-f85d1.appspot.com",
  messagingSenderId: "127217867774",
  appId: "1:127217867774:web:3de91fded5ddea80207eaf",
};
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export default storage;
