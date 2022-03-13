const mongoose = require("mongoose");
const Post = require("../models/postsModel");
const User = require("../models/userModel");
const ObjectId = mongoose.Types.ObjectId;

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
    res.status(400).json({
      message: "failed to fetch posts",
    });
  }
};

exports.getOthersPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id });
    return res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(400).json({
      message: "failed to fetch posts",
    });
  }
};

exports.getFeedPosts = async (req, res) => {
  const ids = req.user.following.map(function (el) {
    return mongoose.Types.ObjectId(el);
  });
  try {
    const feedPosts = await Post.aggregate([
      {
        $match: {
          user: { $in: ids },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "post_user",
        },
      },
      { $sample: { size: 30 } },
    ]);

    return res.status(200).json({
      feedPosts,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.likeAnyPost = async (req, res) => {
  try {
    const likedPost = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $addToSet: { likes: req.user.id },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      likedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createComment = async (req, res) => {
  try {
    if (!req.body.postId) {
      return res.status(500).json({
        error: "Post not found",
      });
    }
    const comment = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: req.body },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      comment: comment.comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};
