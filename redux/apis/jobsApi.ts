import { API_ROUTES } from "@/constant/routes";
import { baseQueryWithAuth } from "@/utils/RtkApiCall";
import { createApi } from "@reduxjs/toolkit/query/react";



export const jobsApis = createApi({
    baseQuery: baseQueryWithAuth,
    reducerPath: "jobs",
    tagTypes: ["Jobs"],
    endpoints: (build) => ({
        uploadReport: build.mutation({
            query: (payload: any) => ({
                url: API_ROUTES.JOBS.REPORTUPLOAD,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Jobs"]
        }),
        previousJobs: build.query({
            query: (payload: any) => ({
                url: API_ROUTES.JOBS.PREVIOUSJOBS,
                method: "GET",
                params: {
                    ...payload,
                    page_size: payload.limit
                }
            }),
            providesTags: ["Jobs"]
        }),
        getTotalJobs: build.query({
            query: () => ({
              url: API_ROUTES.JOBS.TOTALJOBS,
              method: "GET",
            }),
            providesTags: ["Jobs"],
          })
    })
})


export const {
    useUploadReportMutation,
    usePreviousJobsQuery,
    useGetTotalJobsQuery
} = jobsApis