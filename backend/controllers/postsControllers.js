const Post = require("../models/postsModel");
const User = require("../models/userModel");
exports.createPosts = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const post = await Post.create(req.body);
    const postCount = await Post.countDocuments({ user: req.user.id });
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { posts: postCount },
      { new: true }
    );
    console.log(req.user.id);
    console.log(user);
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Failed to create post",
    });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "failed to fetch posts",
    });
  }
};
