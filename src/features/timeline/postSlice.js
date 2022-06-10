import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: [],
  usersPost: [],
  bookmarks: [],
  status: "",
};

export const getPosts = createAsyncThunk("posts/getPost", async () => {
  try {
    const res = await axios.get("/api/posts");
    console.log("adw", res);
    return res.data;
  } catch (error) {
    console.log("error");
    return error;
  }
});

//Edit User Posts

export const edituserPosts = createAsyncThunk(
  "post/edituserPosts",
  async (payload, { rejectWithValue }) => {
    console.log("idhr", payload.postContent);
    try {
      const res = await axios.post(
        `/api/posts/edit/${payload.postId}`,
        { postData: payload.postContent },
        {
          headers: {
            authorization: payload.token,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteUsersPost = createAsyncThunk(
  "post/deleteUsersPost",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/posts/${payload.postId}`, {
        headers: {
          authorization: payload.token,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const userPosts = createAsyncThunk(
  "post/userPosts",
  async (payload, { rejectWithValue }) => {
    console.log("idhr", payload.postContent);
    try {
      const res = await axios.post(
        "/api/posts",
        { postData: payload.postContent },
        {
          headers: {
            authorization: payload.token,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

//getUserPosts to get all post of a particular user

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/posts/user/${payload.username}`);
      // console.log("user post", payload.username, res);
      return res.data;
    } catch (error) {
      console.log("error");
      return rejectWithValue(error);
    }
  }
);

//getUserBookMarks to get all bookmarks of user

export const getUserBookMarks = createAsyncThunk(
  "posts/getUserBookMarks",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/users/bookmark/", {
        headers: {
          authorization: payload.token,
        },
      });
      console.log("adw", res);
      return res.data;
    } catch (error) {
      console.log("error");
      return rejectWithValue(error);
    }
  }
);

export const handleLike = createAsyncThunk(
  "post/handleLike",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `/api/posts/like/${payload.postId}`,
        {},
        {
          headers: {
            authorization: payload.token,
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const handleDislike = createAsyncThunk(
  "post/handleLike",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `/api/posts/dislike/${payload.postId}`,
        {},
        {
          headers: {
            authorization: payload.token,
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const userComments = createAsyncThunk(
  "post/userComments",
  async (payload, { rejectWithValue }) => {
    console.log("idhr", payload.postContent);
    try {
      const res = await axios.post(
        `/api/comments/add/${payload.postId}`,
        { commentData: payload.commentContent },
        {
          headers: {
            authorization: payload.token,
          },
        }
      );
      console.log("comment ", res.data);
      return {
        comments: res.data.comments,
        postId: payload.postId,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const userDeleteComments = createAsyncThunk(
  "post/userDeleteComments",
  async (payload, { rejectWithValue }) => {
    console.log("idhr", payload.commentId);
    try {
      const res = await axios.post(
        `/api/comments/delete/${payload.postId}/${payload.commentId}`,
        {},
        {
          headers: {
            authorization: payload.token,
          },
        }
      );
      console.log("comment ", res.data);
      return {
        comments: res.data.comments,
        postId: payload.postId,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    sortBy: (state, action) => {
      console.log("ima", action.payload);
      state.post = action.payload;
    },
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.status = "loading";
    },
    [getPosts.fulfilled]: (state, action) => {
      state.post = action.payload.posts;
      state.status = "fulfilled";
      console.log("done");
    },
    [getPosts.rejected]: (state) => {
      state.status = "Rejected";
    },
    [userPosts.pending]: (state) => {
      state.status = "loading";
    },
    [userPosts.fulfilled]: (state, action) => {
      state.post = action.payload.posts;
      state.status = "fulfilled";
      console.log("done posted", action.payload.posts);
    },
    [userPosts.rejected]: (state) => {
      state.status = "Rejected";
    },
    [handleLike.pending]: (state) => {
      state.status = "loading";
    },
    [handleLike.fulfilled]: (state, action) => {
      state.post = action.payload.posts;
      state.status = "fulfiled";
      console.log("done");
    },
    [handleLike.rejected]: (state) => {
      state.status = "Rejected";
    },
    [handleDislike.pending]: (state) => {
      state.status = "loading";
    },
    [handleDislike.fulfilled]: (state, action) => {
      state.post = action.payload.posts;
      state.status = "fulfiled";
      console.log("done");
    },
    [handleDislike.rejected]: (state) => {
      state.status = "Rejected";
    },
    [userComments.pending]: (state) => {
      state.status = "loading";
    },
    [userComments.fulfilled]: (state, action) => {
      console.log("uu", action.payload);
      state.post.find(({ _id }) => _id === action.payload.postId).comments =
        action.payload.comments;
      state.status = "fulfiled";
      console.log("done");
    },
    [userComments.rejected]: (state) => {
      state.status = "Rejected";
    },
    [userDeleteComments.pending]: (state) => {
      state.status = "loading";
    },
    [userDeleteComments.fulfilled]: (state, action) => {
      console.log("uu", action.payload);
      state.post.find(({ _id }) => _id === action.payload.postId).comments =
        action.payload.comments;
      state.status = "fulfiled";
      console.log("done");
    },
    [userDeleteComments.rejected]: (state) => {
      state.status = "Rejected";
    },
    [getUserBookMarks.pending]: (state) => {
      state.status = "loading";
    },
    [getUserBookMarks.fulfilled]: (state, action) => {
      console.log("bhook", action.payload);
      state.bookmarks = action.payload.bookmarks;
      state.status = "fulfilled";
      console.log("done");
    },
    [getUserBookMarks.rejected]: (state) => {
      state.status = "Rejected";
    },
    [getUserPosts.pending]: (state) => {
      state.status = "loading";
    },
    [getUserPosts.fulfilled]: (state, action) => {
      // console.log("skksks", action.payload.posts);
      state.usersPost = action.payload.posts;
      state.status = "fulfilled";
      console.log("done");
    },
    [getUserPosts.rejected]: (state) => {
      state.status = "Rejected";
    },
    [edituserPosts.pending]: (state) => {
      state.status = "loading";
    },
    [edituserPosts.fulfilled]: (state, action) => {
      state.post = action.payload.posts;
      state.status = "fulfilled";
      console.log("done posted", action.payload.posts);
    },
    [edituserPosts.rejected]: (state) => {
      state.status = "Rejected";
    },
    [deleteUsersPost.pending]: (state) => {
      state.status = "loading";
    },
    [deleteUsersPost.fulfilled]: (state, action) => {
      state.post = action.payload.posts;
      state.status = "fulfilled";
      console.log("done posted", action.payload.posts);
    },
    [deleteUsersPost.rejected]: (state) => {
      state.status = "Rejected";
    },
  },
});

export const { sortBy } = postSlice.actions;
export default postSlice.reducer;
