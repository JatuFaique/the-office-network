import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: [],
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
  },
});

export const { sortBy } = postSlice.actions;
export default postSlice.reducer;
