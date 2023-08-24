import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-app-api-vie7.onrender.com/",
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
});
