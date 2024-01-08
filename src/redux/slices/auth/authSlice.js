import { createSlice } from "@reduxjs/toolkit";

import { signInAsync } from "./signInSlice";
import { signUpAsync } from "./signUpSlice";
import { signOutAsync } from "./signOutSlice";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    error: null,
  },
  reducers: {
    getAuthFromLocalStorage(state) {
      state.isAuthenticated = localStorage.getItem("isAuth");
      state.user = JSON.parse(localStorage.getItem("user"));
    },
  },
  extraReducers: (builder) => {
    builder
      // pending sign-in request
      .addCase(signInAsync.pending, (state) => {
        state.isLoading = true;
      })

      // fulfilled sign-in request
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        localStorage.setItem("isAuth", state.isAuthenticated);
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
        state.error = null;
      })

      // rejected sign-in request
      .addCase(signInAsync.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message;
      });
    builder
      // pending sign-up request
      .addCase(signUpAsync.pending, (state) => {
        state.isLoading = true;
      })

      // fulfilled sign-up request
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        localStorage.setItem("isAuth", state.isAuthenticated);
        state.isLoading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
        state.error = null;
      })

      // rejected sign-up request
      .addCase(signUpAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      // pending sign-out request
      .addCase(signOutAsync.pending, (state) => {
        state.isLoading = true;
      })

      // fulfilled sign-out request
      .addCase(signOutAsync.fulfilled, (state) => {
        state.isAuthenticated = false;
        localStorage.removeItem("isAuth");
        state.user = null;
        localStorage.removeItem("user");
        state.isLoading = false;
        state.error = null;
        localStorage.setItem(
          "cart",
          JSON.stringify({ products: [], totalAmount: 0, totalQuantity: 0 })
        );
      })

      // rejected sign-out request
      .addCase(signOutAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
