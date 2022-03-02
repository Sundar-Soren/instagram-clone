const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    media: {
      required: true,
      type: String,
    },
    caption: {
      required: true,
      type: String,
    },
    location: {
      type: String,
    },
    likes: {
      type: Array,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postsSchema);
