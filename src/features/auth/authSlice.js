import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  login: false,
  loading: true,
  token: "",
  errorMessage: null,
  userDetail: "",
};

export const authHandler = createAsyncThunk("auth/authHandler", async () => {
  try {
    const res = await axios.post("/api/auth/login", {
      username: "adarshbalika",
      password: "adarshBalika123",
    });
    console.log("oyee", res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [authHandler.pending]: (state) => {
      console.log("idhar");
      state.loading = false;
    },
    [authHandler.fulfilled]: (state, action) => {
      console.log("daya", action.payload);

      state.login = true;
    },
  },
});

export default authSlice.reducer;
