const express = require("express");
const {
  userRegistration,
  userLogin,
  userLogout,
  getUserDetails,
  getUserSuggestion,
  updateUser,
} = require("../controllers/userControllers");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const router = express.Router();

//Auth
router.post("/signup", userRegistration);
router.post("/login", userLogin);
router.get("/logout", userLogout);

//User Details
router.get("/me", isAuthenticated, getUserDetails);
router.put("/user/update", isAuthenticated, updateUser);

router.get("/user_suggestion", getUserSuggestion);

module.exports = router;
