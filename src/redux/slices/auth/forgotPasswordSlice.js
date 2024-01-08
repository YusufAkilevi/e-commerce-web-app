import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../reducers/firebase/firebase";

export const resetPasswordAsync = createAsyncThunk(
    "auth/resetPassword",
    async ({ email, navigate }) => {
        try {
            await sendPasswordResetEmail(auth, email);

            navigate("/forgot-password-notification")
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
);

const forgotPasswordSlice = createSlice({
    name: "auth",

    initialState: {
        isLoading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            // pending reset password request
            .addCase(resetPasswordAsync.pending, (state) => {
                state.isLoading = true;
            })

            // fulfilled reset password request
            .addCase(resetPasswordAsync.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })

            // rejected reset password request
            .addCase(resetPasswordAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default forgotPasswordSlice.reducer;