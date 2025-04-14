import { PAGE_SIZE } from "@/constant";
import { API_ROUTES } from "@/constant/routes";
import { baseQueryWithAuth } from "@/utils/RtkApiCall";
import { createApi } from "@reduxjs/toolkit/query/react";

export const creditsApi = createApi({
  baseQuery: baseQueryWithAuth,
  reducerPath: "credits",
  tagTypes: ["Credits"],
  endpoints: (build) => ({
    cretaCredits: build.mutation({
      query: (payload: any) => ({
        url: API_ROUTES.CREDITS.CREATECREDITS,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Credits"],
    }),
    getCredits: build.query({
      query: (payload: any) => ({
        url: API_ROUTES.CREDITS.GETCREDITS,
        method: "GET",
        params: {
          ...payload,
          page_size: PAGE_SIZE,
        },
      }),
      providesTags: ["Credits"],
    }),
    usedCredits: build.query({
      query: (payload: any) => ({
        url: API_ROUTES.CREDITS.USEDCREDITS,
        method: "GET",
        params: {
          ...payload,
          page_size: PAGE_SIZE,
        },
      }),
      providesTags: ["Credits"],
    }),
    getTotalCredits: build.query({
      query: () => ({
        url: API_ROUTES.CREDITS.TOTALCREDITS,
        method: "GET",
      }),
      providesTags: ["Credits"],
    })
  }),
});

export const {
  useCretaCreditsMutation,
  useGetCreditsQuery,
  useUsedCreditsQuery,
  useGetTotalCreditsQuery
} = creditsApi;
