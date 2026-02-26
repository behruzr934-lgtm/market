import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import BasketSlice from './Basketslice'
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    basket : BasketSlice,
    auth: authReducer,
  }, 
});
