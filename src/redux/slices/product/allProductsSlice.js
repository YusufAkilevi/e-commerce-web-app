import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProductData = createAsyncThunk(
  "products/fetchAllProducts",
  async (curPage) => {
    const baseUrl = "https://dummyjson.com/products";
    const limit = 12;
    const url = `${baseUrl}?limit=${limit}&skip=${limit * (curPage - 1)}`;

    const res = await fetch(url);
    const data = await res.json();

    return data;
  }
);

const allProductsSlice = createSlice({
  name: "allProducts",

  initialState: {
    productData: { products: [], total: 0 },
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    // pending request
    builder.addCase(fetchAllProductData.pending, (state) => {
      state.loading = true;
    });

    // fulfilled request
    builder.addCase(fetchAllProductData.fulfilled, (state, action) => {
      state.loading = false;
      state.productData = action.payload;
    });

    // rejected request
    builder.addCase(fetchAllProductData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

const { fetchAllProducts } = allProductsSlice.actions;

export { fetchAllProducts };

export default allProductsSlice.reducer;
