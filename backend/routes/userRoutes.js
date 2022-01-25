const express = require("express");
const {
  userRegistration,
  userLogin,
  userLogout,
  getUserDetails,
} = require("../controllers/userControllers");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const router = express.Router();

//Auth
router.post("/signup", userRegistration);
router.post("/login", userLogin);
router.get("/logout", userLogout);

//User Details
router.get("/me", isAuthenticated, getUserDetails);

module.exports = router;
