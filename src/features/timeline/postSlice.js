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
  },
});

export const { sortBy } = postSlice.actions;
export default postSlice.reducer;
