import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// registerUser is an asynchronous action creator that sends a registration request to a server and manages the request's lifecycle using Redux Toolkit. When you dispatch this action, it will handle the API call and the resulting state changes in your Redux store.

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

// AsyncThunk of loginUser
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    formData,
    {
      withCredentials: true,
    }
  );
  return response.data;
});


// AsyncThunk of logoutUser
export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/logout",
    {},  //since we are not passing any formdata but still we have to pass empty {}  (for  corect configuration)
    {
      withCredentials: true,
    }
  );
  return response.data;
});
// Async thunk of user Authentication
export const checkAuth  = createAsyncThunk("/auth/checkauth", async () => {
    const response = await axios.get(
      "http://localhost:5000/api/auth/check-auth",
      {
        withCredentials: true,
        headers:{
            "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        }
      }
    );
    return response.data;
  });
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setuser: (state, action) => {},
  },
  // whateven response we got from createAsyncThunk(register) it will give us 3 state pending ,action or fulfill based on this we will fill our initial state
  extraReducers: (builder) => {
    // 3 cases for register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false; //when user authenticated for the first tymhe will not be authenticated , he first have to go to login page and wrote credentials then only he wiill be authenticated
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })    // 3 case for login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success; // here isAuthenticated will be true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;    // 3 case for authentication  user
      }).addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      }).addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});
export const { setuser } = authSlice.actions;
export default authSlice.reducer;
