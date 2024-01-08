import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearchProductData = createAsyncThunk(
    "searchProducts/fetchSearchProductData",
    async (searchParam) => {
        const baseUrl = "https://dummyjson.com/products/search";
        const url = `${baseUrl}?q=${searchParam}`;

        const res = await fetch(url);
        const data = await res.json();

        return data;
    }
);

const searchProductSlice = createSlice({
    name: "searchProducts",

    initialState: {
        productData: { products: [] },
        loading: false,
        error: null,
        searchParam: "",
    },

    reducers: {
        getSearchParam: (state, action) => {
            state.searchParam = action.payload;
        },
    },

    extraReducers: (builder) => {
        // pending request
        builder.addCase(fetchSearchProductData.pending, (state) => {
            state.loading = true;
        });

        // fulfilled request
        builder.addCase(fetchSearchProductData.fulfilled, (state, action) => {
            state.loading = false;
            state.productData = action.payload;
        });

        // rejected request
        builder.addCase(fetchSearchProductData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

const { getSearchParam } = searchProductSlice.actions;

export { getSearchParam };

export default searchProductSlice.reducer;
