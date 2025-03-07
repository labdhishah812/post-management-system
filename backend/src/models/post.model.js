const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postName: {
      type: String,
      required: [true, "Post name is required"],
    },
    postDetails: {
      type: String,
      required: [true, "Post details are required"],
    },
    postDescription: {
      type: String,
      required: [true, "Post description is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);