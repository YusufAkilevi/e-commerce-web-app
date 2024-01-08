import { combineReducers } from "redux";

// Auth Slice
// import signInSlice from "../slices/auth/signInSlice";
// import signOutSlice from "../slices/auth/signOutSlice";
// import signUpSlice from "../slices/auth/signUpSlice";
import authSlice from "../slices/auth/authSlice";

// Cart Slice
import cartSlice from "../slices/cart/cartSlice";

// Product Slice
import allProductsSlice from "../slices/product/allProductsSlice";
import searchProductsSlice from "../slices/product/searchProductsSlice";
import singleProductSlice from "../slices/product/singleProductsSlice";

// Category Product Slice
import categoryProductsSlice from "../slices/categoryProductsSlice";
import checkoutSlice from "../slices/cart/checkoutSlice";

const rootReducer = combineReducers({
  // Reducers

  // Auth Reducers
  auth: authSlice,
  // signIn: signInSlice,
  // signOut: signOutSlice,
  // signUp: signUpSlice,

  // Cart Reducers
  cart: cartSlice,


  // Product Reducers
  allProducts: allProductsSlice,
  searchProducts: searchProductsSlice,
  singleProduct: singleProductSlice,


  // Category Product Reducers
  categoryProducts: categoryProductsSlice,
});

export default rootReducer;
