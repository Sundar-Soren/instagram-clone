const express = require("express");
const {
  userRegistration,
  userLogin,
  userLogout,
  getUserDetails,
  getUserSuggestion,
  updateUser,
  followingUser,
  unFollowingUser,
  getProfileDetails,
  getUserById,
} = require("../controllers/userControllers");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const router = express.Router();

//Auth
router.post("/signup", userRegistration);
router.post("/login", userLogin);
router.get("/logout", userLogout);

//User Details
router.get("/me", isAuthenticated, getUserDetails);
router.get("/user/:userId", isAuthenticated, getUserById);
router.put("/user/update", isAuthenticated, updateUser);

router.get("/user_suggestion", isAuthenticated, getUserSuggestion);

//FOLLOW

router.put("/user/following", isAuthenticated, followingUser);
router.put("/user/unfollowing", isAuthenticated, unFollowingUser);

//PROFILE
router.get("/user/profile/:username", getProfileDetails);

module.exports = router;
