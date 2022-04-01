const express = require("express");
const {
  createPosts,
  getMyPosts,
  getOthersPosts,
  getFeedPosts,
  likeAnyPost,
  createComment,
  getPostById,
  getPostComments,
} = require("../controllers/postsControllers");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/post/create", isAuthenticated, createPosts);
router.get("/post/getmy", isAuthenticated, getMyPosts);
router.get("/post/others/:id", getOthersPosts);
router.get("/post/:postId", getPostById);

router.post("/feedPosts", isAuthenticated, getFeedPosts);
router.put("/post/like", isAuthenticated, likeAnyPost);

//comments

router.put("/comment/create", isAuthenticated, createComment);
router.get("/comment/:postId", isAuthenticated, getPostComments);

module.exports = router;
