import { PAGE_SIZE } from "@/constant";
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
            })
        }),
        previousJobs: build.query({
            query: (payload: any) => ({
                url: API_ROUTES.JOBS.PREVIOUSJOBS,
                method: "GET",
                params: {
                    ...payload,
                    page_size: payload.limit
                }
            })
        })
    })
})


export const {
    useUploadReportMutation,
    usePreviousJobsQuery
} = jobsApis