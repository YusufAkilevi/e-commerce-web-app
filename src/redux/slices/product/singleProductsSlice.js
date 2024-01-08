import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductData = createAsyncThunk(
  "products/fetchProduct",
  async (productId) => {
    const baseUrl = "https://dummyjson.com/products";
    const url = `${baseUrl}/${productId}`;

    const res = await fetch(url);
    const data = await res.json();

    return data;
  }
);

const singleProductSlice = createSlice({
  name: "singleProduct",

  initialState: {
    productData: {},
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    // pending request
    builder.addCase(fetchProductData.pending, (state) => {
      state.loading = true;
    });

    // fulfilled request
    builder.addCase(fetchProductData.fulfilled, (state, action) => {
      state.loading = false;
      state.productData = action.payload;
    });

    // rejected request
    builder.addCase(fetchProductData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const singleProductActions = singleProductSlice.actions;

export default singleProductSlice.reducer;
