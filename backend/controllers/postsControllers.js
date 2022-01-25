const Post = require("../models/postsModel");

exports.createPosts = async (req, res) => {
  req.body.user = req.user.id;
  try {
    const post = await Post.create(req.body);

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
