import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    products: [],
    totalQuantity: 0,
    totalAmount: 0,
  },

  reducers: {
    getCartFromLocalStorage(state) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart) {
        state.products = cart.products;
        state.totalAmount = cart.totalAmount;
        state.totalQuantity = cart.totalQuantity;
      }
    },
    clearCart(state) {
      state.products = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
    addToCart(state, action) {
      const newProduct = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === newProduct.id
      );

      if (!existingProduct) {
        state.products.push({
          id: newProduct.id,
          price: newProduct.price,
          quantity: 1,
          totalPrice: newProduct.price,
          title: newProduct.title,
          brand: newProduct.brand,
          image: newProduct.images[0],
        });
      } else {
        existingProduct.quantity++;
        existingProduct.totalPrice += newProduct.price;
      }
      state.totalQuantity++;
      state.totalAmount += newProduct.price;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.products.find((product) => product.id === id);

      if (existingItem.quantity === 1) {
        state.products = state.products.filter((product) => product.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }

      state.totalQuantity--;
      state.totalAmount -= existingItem.price;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
