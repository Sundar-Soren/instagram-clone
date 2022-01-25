const express = require("express");
const { createPosts, getMyPosts } = require("../controllers/postsControllers");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/post/create", isAuthenticated, createPosts);
router.get("/post/getmy", isAuthenticated, getMyPosts);

module.exports = router;
