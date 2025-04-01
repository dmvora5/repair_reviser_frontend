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
  }),
});

export const { useCretaCreditsMutation } = creditsApi;
