import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  status: "loading",
};

export const usersHandler = createAsyncThunk(
  "/users/usersHandler",
  async () => {
    try {
      const res = await axios.get("/api/users");
      console.log("adw", res);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: {
    [usersHandler.pending]: (state) => {
      state.status = "loading";
    },
    [usersHandler.fulfilled]: (state, action) => {
      console.log("ho gayi", action.payload);
      state.users = action.payload.users;
    },
    [usersHandler.rejected]: (state, action) => {
      state.status = "Rejected";
    },
  },
});

export default usersSlice.reducer;
