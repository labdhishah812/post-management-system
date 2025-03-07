import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updatePost, setCurrentPost } from '../../features/Auth/postSlice';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userPosts, loading, error } = useSelector((state) => state.posts);

  const [postData, setPostData] = useState({ postName: '', postDetails: '', postDescription: '' });

  useEffect(() => {
    const post = userPosts.find((post) => post._id === id);
    if (post) {
      setPostData({
        postName: post.postName,
        postDetails: post.postDetails,
        postDescription: post.postDescription,
      });
      dispatch(setCurrentPost(post));
    }
  }, [id, userPosts, dispatch]);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost({ postId: id, postData })).then(() => navigate('/my-posts'));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      {loading && <p>Updating...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="postName"
          value={postData.postName}
          onChange={handleChange}
          placeholder="Post Name"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="postDetails"
          value={postData.postDetails}
          onChange={handleChange}
          placeholder="Post Details"
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <textarea
          name="postDescription"
          value={postData.postDescription}
          onChange={handleChange}
          placeholder="Post Description"
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
