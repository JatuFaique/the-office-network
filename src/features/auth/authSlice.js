import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//authSlice should be named as userslice

const initialState = {
  login: false,
  status: "idle",
  token: localStorage.getItem("token") || "",
  errorMessage: null,
  userDetail: JSON.parse(localStorage.getItem("user")) || "",
};

export const handleBookmark = createAsyncThunk(
  "auth/handleBookmark",
  async (payload, { rejectWithValue }) => {
    console.log("iin bookmark");
    try {
      const res = await axios.post(
        `/api/users/bookmark/${payload.postId}`,
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

export const handleUnBookmark = createAsyncThunk(
  "auth/handleBookmark",
  async (payload, { rejectWithValue }) => {
    console.log("iin unbookmark");
    try {
      const res = await axios.post(
        `/api/users/remove-bookmark/${payload.postId}`,
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

export const followUser = createAsyncThunk(
  "auth/followUser",
  async (userInfo, { rejectWithValue }) => {
    console.log(userInfo);
    try {
      const res = await axios.post(
        `/api/users/follow/${userInfo.userId}`,
        {},
        {
          headers: {
            authorization: userInfo.token,
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

export const unfollowUser = createAsyncThunk(
  "auth/followUser",
  async (userInfo, { rejectWithValue }) => {
    console.log(userInfo);
    try {
      const res = await axios.post(
        `/api/users/unfollow/${userInfo.userId}`,
        {},
        {
          headers: {
            authorization: userInfo.token,
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

export const editProfile = createAsyncThunk(
  "auth/editProfile",
  async (payload, { rejectWithValue }) => {
    console.log("main hi update");
    try {
      const res = await axios.post(
        "/api/users/edit",
        {
          userData: payload.formData,
        },
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

export const authHandler = createAsyncThunk(
  "auth/authHandler",
  async (formData, { rejectWithValue }) => {
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
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/signup", formData);

      return res.data;
    } catch (err) {
      console.log("wrng ", err);
      return rejectWithValue(err.response.data);
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
        login: false,
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
      state.userDetail = action.payload.foundUser;
      localStorage.setItem("user", JSON.stringify(action.payload.foundUser));
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
      state.userDetail = action.payload.createdUser;
      state.token = action.payload.encodedToken;
      state.status = "fullfiled";
      state.login = true;
    },
    [signUpHandler.rejected]: (state, action) => {
      state.errorMessage = action.payload.errors;
      state.status = "Rejected";
      state.login = false;
    },
    [followUser.pending]: (state) => {
      state.status = "loading";
    },
    [followUser.fulfilled]: (state, action) => {
      console.log("ho gayi", action.payload);
      state.status = "fullfiled";
      state.userDetail.following = [
        ...state.userDetail.following,
        action.payload.followUser,
      ];
    },
    [followUser.rejected]: (state, action) => {
      state.errorMessage = action.payload.errors;
      state.status = "Rejected";
    },
    [unfollowUser.pending]: (state) => {
      state.status = "loading";
    },
    [unfollowUser.fulfilled]: (state, action) => {
      console.log("ho gayi", action.payload);
      state.status = "fullfiled";
      state.userDetail.following = [
        ...state.userDetail.following,
        action.payload.followUser,
      ];
    },
    [unfollowUser.rejected]: (state, action) => {
      state.errorMessage = action.payload.errors;
      state.status = "Rejected";
    },
    [handleBookmark.pending]: (state) => {
      state.status = "loading";
    },
    [handleBookmark.fulfilled]: (state, action) => {
      console.log("ho gayi", action.payload);
      state.status = "fulfilled";
      state.userDetail.bookmarks = action.payload.bookmarks;
    },
    [handleBookmark.rejected]: (state, action) => {
      state.errorMessage = action.payload.errors;
      state.status = "Rejected";
    },
    [handleUnBookmark.pending]: (state) => {
      state.status = "loading";
    },
    [handleUnBookmark.fulfilled]: (state, action) => {
      console.log("ho gayi", action.payload);
      state.status = "fulfilled";
      state.userDetail.bookmarks = action.payload.bookmarks;
    },
    [handleUnBookmark.rejected]: (state, action) => {
      state.errorMessage = action.payload.errors;
      state.status = "Rejected";
    },
    [editProfile.pending]: (state) => {
      state.status = "loading";
    },
    [editProfile.fulfilled]: (state, action) => {
      console.log("ho gayi", action.payload);
      state.status = "fulfilled";
      state.userDetail = action.payload.user;
    },
    [editProfile.rejected]: (state, action) => {
      state.errorMessage = action.payload.errors;
      state.status = "Rejected";
    },
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
