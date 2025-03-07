const postService = require('../services/post.service');

const createPost = async (req, res) => {
  try {
    const postData = {
      ...req.body,
      userId: req.user.id
    };
    
    const newPost = await postService.createPost(postData);
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: newPost
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create post',
      error: error
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch posts',
      error: error.message
    });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await postService.getPostsByUserId(userId);
    
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your posts',
      error: error.message
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch post',
      error: error
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const updatedPost = await postService.updatePost(
      req.params.id,
      req.user.id,
      req.body
    );
    
    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message || 'Failed to update post',
      error: error
    });
  }
};

const deletePost = async (req, res) => {
  try {
    await postService.deletePost(req.params.id, req.user.id);
    
    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message || 'Failed to delete post',
      error: error
    });
  }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    getMyPosts,
    updatePost,
    deletePost
}