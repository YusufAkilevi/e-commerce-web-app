import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../reducers/firebase/firebase";

const checkoutSlice = createSlice({
    name: "checkout",

    initialState: {
        orders: [],
    },

    reducers: {
        addCheckout: (state, action) => {
            state.orders.push(action.payload);
        },
    },
});

export const { addCheckout } = checkoutSlice.actions;

export const addCheckoutAsync = (checkOutData, userUid) => async (dispatch) => {
    const checkoutWithUser = { ...checkOutData, userUid };

    const docRef = await db.collection("orders").add(checkoutWithUser);

    dispatch(addCheckout({ id: docRef.id, ...checkoutWithUser }));
};

export const selectOrders = (state) => state.checkout.orders;

export default checkoutSlice.reducer;
