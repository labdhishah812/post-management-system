import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchUserPosts, deletePost, clearPostsState, createPost } from '../../features/Auth/postSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const hasInitialized = useRef(false);

  const { userPosts, loading, error, success } = useSelector((state) => state.posts || {});
  const { isAuthenticated } = useSelector((state) => state.auth || {});

  useEffect(() => {
    if (hasInitialized.current) return;

    if (isAuthenticated) {
      dispatch(fetchUserPosts());
      hasInitialized.current = true;
    } else if (isAuthenticated === false && location.pathname !== '/login') {
      navigate('/login');
    }

    return () => {
      dispatch(clearPostsState());
      hasInitialized.current = false;
    };
  }, [dispatch, isAuthenticated, navigate, location.pathname]);

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(postId));
    }
  };

  const handleCreatePost = () => {
    window.open('/create-post', '_blank');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Posts</h1>
        <button
          onClick={handleCreatePost}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Create New Post
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
          <p>Operation completed successfully!</p>
        </div>
      )}

      {!userPosts || userPosts.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-600">You haven't created any posts yet.</p>
          <button
            onClick={handleCreatePost}
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Create Your First Post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPosts.map((post) => (
            <div key={post._id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 ease-in-out">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                
                {post.category && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                )}
                
                {post.tags && post.tags.length > 0 && post.tags.map((tag, index) => (
                  <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <Link 
                    to={`/posts/${post._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More
                  </Link>
                  
                  <div className="flex space-x-2">
                    <Link 
                      to={`/edit-post/${post._id}`}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </Link>
                    <button 
                      onClick={() => handleDelete(post._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
