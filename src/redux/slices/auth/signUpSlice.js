import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../reducers/firebase/firebase";

export const signUpAsync = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, navigate }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    };

    navigate("/");

    return user;
  }
);

// const signUpSlice = createSlice({
//   name: "auth",

//   initialState: {
//     isAuthenticated: false,
//     isLoading: false,
//     user: null,
//     error: null,
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//       // pending sign-up request
//       .addCase(signUpAsync.pending, (state) => {
//         state.isLoading = true;
//       })

//       // fulfilled sign-up request
//       .addCase(signUpAsync.fulfilled, (state, action) => {
//         state.isAuthenticated = true;
//         localStorage.setItem("isAuth", state.isAuthenticated);
//         state.isLoading = false;
//         state.user = action.payload;
//         localStorage.setItem("user", JSON.stringify(state.user));
//         state.error = null;
//       })

//       // rejected sign-up request
//       .addCase(signUpAsync.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default signUpSlice.reducer;
