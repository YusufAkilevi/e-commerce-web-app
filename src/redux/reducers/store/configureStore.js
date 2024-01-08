import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../index";
import thunk from "redux-thunk";

export default function configureAppStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: [thunk],
    });
}