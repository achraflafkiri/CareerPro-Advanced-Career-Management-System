import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/middleware/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
