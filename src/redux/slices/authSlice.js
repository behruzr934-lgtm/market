import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  isAuthenticated: !!localStorage.getItem("user"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("user");
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
