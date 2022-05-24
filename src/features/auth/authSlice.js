import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  login: false,
  status: "idle",
  token: localStorage.getItem("token") || "",
  errorMessage: null,
  userDetail: "",
};

export const authHandler = createAsyncThunk(
  "auth/authHandler",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const res = await axios.post("/api/auth/login", formData);
      return res.data;
      // return res.response;
    } catch (error) {
      console.log("errop", error.response.status);
      return rejectWithValue(error.response.data);
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
  reducers: {
    logoutUser: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        userDetail: "",
        token: null,
      };
    },
  },
  extraReducers: {
    [authHandler.pending]: (state, action) => {
      state.status = "loading";
    },
    [authHandler.fulfilled]: (state, action) => {
      console.log("ho gayi", action.payload);
      state.userDetail = action.payload.foundUser.firstName;
      state.token = action.payload.encodedToken;
      localStorage.setItem("token", action.payload.encodedToken);
      state.status = "fullfiled";
      state.login = true;
    },
    [authHandler.rejected]: (state, action) => {
      state.errorMessage = action.payload.errors;
      state.status = "Rejected";
      state.login = false;
    },
    [signUpHandler.pending]: (state) => {
      state.status = "loading";
    },
    [signUpHandler.fulfilled]: (state, action) => {
      console.log("ho gayi", action.payload);
      state.userDetail = action.payload.data.createdUser.firstName;
      state.token = action.payload.data.encodedToken;
      state.status = "fullfiled";
      state.login = true;
    },
    [signUpHandler.rejected]: (state, action) => {
      state.errorMessage = action.payload;
      state.status = "Rejected";
      state.login = false;
    },
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
