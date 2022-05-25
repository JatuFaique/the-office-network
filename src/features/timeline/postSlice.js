import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: [],
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

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
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
  },
});

export default postSlice.reducer;
