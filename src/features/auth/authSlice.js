import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  login: false,
  status: "idle",
  token: "",
  errorMessage: null,
  userDetail: "",
};

export const authHandler = createAsyncThunk(
  "auth/authHandler",
  async (formData) => {
    console.log(formData);
    try {
      const res = await axios.post("/api/auth/login", formData);
      return res;
    } catch (err) {
      return err;
    }
  }
);

export const signUpHandler = createAsyncThunk(
  "auth/signUpHandler",
  async (formData) => {
    console.log(formData);
    try {
      const res = await axios.post("/api/auth/signup", formData);
      return res;
    } catch (err) {
      return err;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [authHandler.pending]: (state, action) => {
      state.status = "loading";
    },
    [authHandler.fulfilled]: (state, action) => {
      if (action.payload.status === 200 || action.payload.status === 201) {
        console.log(action.payload);
        state.userDetail = action.payload.data.foundUser.firstName;
        state.token = action.payload.data.encodedToken;
        state.status = "fullfiled";
        state.login = true;
      } else {
        state.status = "Failed";
        state.errorMessage = "Something went Wrong";
      }
    },
    [signUpHandler.pending]: (state, action) => {
      state.status = "loading";
    },
    [signUpHandler.fulfilled]: (state, action) => {
      if (action.payload.status === 200 || action.payload.status === 201) {
        console.log(action.payload);
        state.userDetail = action.payload.data.createdUser.username;
        state.token = action.payload.data.encodedToken;
        state.status = "fullfiled";
        state.login = true;
      } else {
        state.status = "Failed";
        state.errorMessage = "Something went Wrong";
      }
    },
  },
});

export default authSlice.reducer;
