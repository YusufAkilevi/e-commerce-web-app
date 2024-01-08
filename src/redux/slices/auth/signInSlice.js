import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../reducers/firebase/firebase";

export const signInAsync = createAsyncThunk(
  "auth/signIn",
  async ({ email, password, navigate }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };

      navigate(-1);

      return user;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
);

// const signInSlice = createSlice({
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
//       // pending sign-in request
//       .addCase(signInAsync.pending, (state) => {
//         state.isLoading = true;
//       })

//       // fulfilled sign-in request
//       .addCase(signInAsync.fulfilled, (state, action) => {
//         state.isAuthenticated = true;
//         localStorage.setItem("isAuth", state.isAuthenticated);
//         state.user = action.payload;
//         localStorage.setItem("user", JSON.stringify(state.user));
//         state.error = null;
//       })

//       // rejected sign-in request
//       .addCase(signInAsync.rejected, (state, action) => {
//         state.isAuthenticated = false;
//         state.user = null;
//         state.error = action.error.message;
//       });
//   },
// });

// export default signInSlice.reducer;
