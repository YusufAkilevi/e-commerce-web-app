import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategoryProductData = createAsyncThunk(
    "products/fetchCategoryProducts",
    async (category) => {
        const baseUrl = "https://dummyjson.com/products/category";
        const url = `${baseUrl}/${category}`;

        const res = await fetch(url);
        const data = await res.json();

        return data;
    }
);

const categoryProductsSlice = createSlice({
    name: "allProducts",

    initialState: {
        productData: { products: [], total: 0, limit: 0 },
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        // pending
        builder.addCase(fetchCategoryProductData.pending, (state) => {
            state.loading = true;
        });

        // fulfilled
        builder.addCase(fetchCategoryProductData.fulfilled, (state, action) => {
            state.loading = false;
            state.productData = action.payload;
        });

        // rejected
        builder.addCase(fetchCategoryProductData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const categoryProductsActions = categoryProductsSlice.actions;

export default categoryProductsSlice.reducer;
