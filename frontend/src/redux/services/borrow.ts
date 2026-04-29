import type { IBorrowWithoutId } from "@/interfaces/Iborrow";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_BASE_URL;
export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["borrow"],
  endpoints: (builder) => ({
    borrowBook: builder.mutation({
      query: ({ borrowData }: { borrowData: IBorrowWithoutId }) => ({
        url: `/borrow`,
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["borrow"],
    }),
    getAllBorrow: builder.query({
      query: () => "/borrow",
      providesTags: ["borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetAllBorrowQuery } = borrowApi;
