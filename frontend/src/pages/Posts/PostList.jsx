import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts, deletePost } from '../../features/Auth/postSlice';
import { Link } from 'react-router-dom';

const PostsList = () => {
  const dispatch = useDispatch();
  const { userPosts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchUserPosts());
  }, [dispatch]);

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(postId));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">My Posts</h2>
      <Link to="/create-post" className="bg-green-600 text-white py-2 px-4 rounded">Create New Post</Link>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="mt-4">
        {userPosts && userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post._id} className="p-4 border-b flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{post.postName}</h3>
                <p className="text-gray-600">{post.postDetails}</p>
                <p>{post.postDescription}</p>
              </div>
              <div className="flex gap-3">
                <Link to={`/edit-post/${post._id}`} className="bg-blue-500 text-white py-1 px-3 rounded">Edit</Link>
                <button 
                  onClick={() => handleDelete(post._id)} 
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default PostsList;
