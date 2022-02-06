const express = require("express");
const {
  createPosts,
  getMyPosts,
  getOthersPosts,
  getFeedPosts,
} = require("../controllers/postsControllers");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/post/create", isAuthenticated, createPosts);
router.get("/post/getmy", isAuthenticated, getMyPosts);
router.get("/post/others/:id", getOthersPosts);

router.post("/feedPosts", isAuthenticated, getFeedPosts);

module.exports = router;
