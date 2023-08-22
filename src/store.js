import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlices.js";
import { apiSlice } from "./Slices/apiSlices.js";
import { setupListeners } from "@reduxjs/toolkit/dist/query/index.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
