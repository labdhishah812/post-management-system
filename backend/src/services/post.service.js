const postModel = require('../models/post.model');
const mongoose = require('mongoose');

const createPost = async (postData) => {
  try {
    const newPost = new postModel(postData);
    return await newPost.save(postData);
  } catch (error) {
    throw error;
  }
};
const getAllPosts = async () => {
  try {
    return await postModel.find().populate('userId', 'firstName lastName email');
  } catch (error) {
    throw error;
  }
};

const getPostsByUserId = async (userId) => {
  try {
    return await postModel.find({ userId }).populate('userId', 'firstName lastName email');
  } catch (error) {
    throw error;
  }
};
const getPostById = async (postId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new Error('Invalid post ID');
    }
    return await postModel.findById(postId).populate('userId', 'firstName lastName email');
  } catch (error) {
    throw error;
  }
};

const updatePost = async (postId, userId, updateData) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new Error('Invalid post ID');
    }
    const post = await postModel.findOne({ _id: postId, userId });
    if (!post) {
      throw new Error('Post is not found or you do not have permission to update this post');
    }
    
    return await postModel.findByIdAndUpdate(
      postId, 
      updateData, 
      { new: true, runValidators: true }
    );
  } catch (error) {
    throw error;
  }
};
const deletePost = async (postId, userId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new Error('Invalid post ID');
    }
    const post = await postModel.findOne({ _id: postId, userId });
    if (!post) {
      throw new Error('Post is not found or you do not have permission to delete this post');
    }
    
    return await postModel.findByIdAndDelete(postId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    getPostsByUserId,
    updatePost,
    deletePost
}