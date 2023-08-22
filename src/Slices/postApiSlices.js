import { apiSlice } from "./apiSlices";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (form) => {
        return {
          url: "post/create",
          method: "POST",
          body: form,
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(
            postApiSlice.util.updateQueryData("getPost", undefined, (draft) => {
              draft?.posts?.push(data.data.post);
            })
          );
        } catch (error) {}
      },
    }),
    getPost: builder.query({
      query: () => {
        return {
          url: "post/all",
          method: "GET",
        };
      },
    }),
    deletePost: builder.mutation({
      query: (id) => {
        return {
          url: `post/delete/${id}`,
          method: "DELETE",
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            postApiSlice.util.updateQueryData("getPost", undefined, (draft) => {
              const index = draft?.posts.findIndex((item) => item._id === id);
              draft?.posts?.splice(index, 1);
            })
          );
        } catch (error) {}
      },
    }),
    updatePost: builder.mutation({
      query: ({ id, form }) => {
        return {
          url: `post/update/${id}`,
          method: "PUT",
          body: form,
        };
      },
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(
            postApiSlice.util.updateQueryData("getPost", undefined, (draft) => {
              const index = draft?.posts.findIndex((item) => item._id === id);
              draft?.posts?.splice(index, 1, data.data.newpost);
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postApiSlice;
