import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/posts/list');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
    'posts/fetchUserPosts',
    async (_, { rejectWithValue, getState }) => {
      try {
        const { auth } = getState();
        console.log("Fetching user posts with token:", auth.token);
        
        const response = await axios.get('http://localhost:5000/api/v1/posts/user-posts', {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });
  
        console.log("API Response:", response.data);
        return response.data.data;
      } catch (error) {
        console.error("Fetch error:", error);
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch your posts');
      }
    }
  );
  

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.post('http://localhost:5000/api/v1/posts/create', postData, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create post');
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ postId, postData }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.patch(`http://localhost:5000/api/v1/posts/update/${postId}`, postData, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update post');
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      await axios.delete(`http://localhost:5000/api/v1/posts/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      return postId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete post');
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    allPosts: [],
    userPosts: [],
    currentPost: null,
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    clearPostsState: (state) => {
      state.error = null;
      state.success = false;
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.allPosts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts.push(action.payload);
        state.success = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        
        const index = state.userPosts.findIndex(post => post._id === action.payload._id);
        if (index !== -1) {
          state.userPosts[index] = action.payload;
        }
       
        if (state.currentPost && state.currentPost._id === action.payload._id) {
          state.currentPost = action.payload;
        }
        
        state.success = true;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = state.userPosts.filter(post => post._id !== action.payload);
        state.success = true;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearPostsState, setCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;