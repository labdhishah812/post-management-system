import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../features/Auth/postSlice';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.posts);

  const [post, setPost] = useState({
    postName: '',
    postDetails: '',
    postDescription: ''
  });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(post)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/dashboard');
      }
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="postName"
          value={post.postName}
          onChange={handleChange}
          placeholder="Post Name"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="text"
          name="postDetails"
          value={post.postDetails}
          onChange={handleChange}
          placeholder="Post Details"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          name="postDescription"
          value={post.postDescription}
          onChange={handleChange}
          placeholder="Post Description"
          className="w-full p-2 border rounded mb-4"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded w-full"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
