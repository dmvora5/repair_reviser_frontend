import { API_ROUTES } from "@/constant/routes";
import { baseQueryWithAuth } from "@/utils/RtkApiCall";
import { createApi } from "@reduxjs/toolkit/query/react";



export const jobsApis = createApi({
    baseQuery: baseQueryWithAuth,
    reducerPath: "jobs",
    tagTypes: ["Jobs", "JobsAnalytics", "JobsAnalyticsList"],
    endpoints: (build) => ({
        uploadReport: build.mutation({
            query: (payload: any) => ({
                url: API_ROUTES.JOBS.REPORTUPLOAD,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Jobs", "JobsAnalytics", "JobsAnalyticsList"]
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
        }),
        JobDetails: build.query({
            query: (payload: any) => ({
                url: `${API_ROUTES.JOBS.JOBDETAILS}${payload}`,
                method: "GET",
            }),
            providesTags: ["Jobs"],
        }),
        GetAmends: build.query({
            query: (payload: any) => ({
                url: `${API_ROUTES.JOBS.AMENDSREAD}${payload}`,
                method: "GET",
            }),
            providesTags: ["Jobs"],
        }),
        ViewAmends: build.query({
            query: (payload: any) => ({
                url: `${API_ROUTES.JOBS.VIEWAGGREDAMANDS}${payload}?agree=true`,
                method: "GET",
            }),
            providesTags: ["Jobs"],
        }),
        updateAmends: build.mutation({
            query: (payload: any) => ({
                url: API_ROUTES.JOBS.AMENDSUPDATE + payload?.id + "/",
                method: "PATCH",
                body: payload
            }),
            invalidatesTags: ["Jobs", "JobsAnalytics", "JobsAnalyticsList"]
        }),
        updateBulkAmends: build.mutation({
            query: (payload: any) => ({
                url: API_ROUTES.JOBS.AMANDBULKUPDATE,
                method: "PATCH",
                body: payload
            }),
            invalidatesTags: ["Jobs", "JobsAnalytics", "JobsAnalyticsList"]
        }),
        updateGeneralSuggestions: build.mutation({
            query: (payload: any) => ({
                url: API_ROUTES.JOBS.UPDATEGENERALSUGGESTION + payload?.id + "/",
                method: "PATCH",
                body: payload
            }),
            invalidatesTags: ["Jobs", "JobsAnalytics", "JobsAnalyticsList"]
        }),
        updateRepaireCost: build.mutation({
            query: (payload: any) => ({
                url: API_ROUTES.JOBS.UPDATEREPAIRECOST + payload?.id + "/",
                method: "PATCH",
                body: payload
            }),
            invalidatesTags: ["Jobs", "JobsAnalytics", "JobsAnalyticsList"]
        }),
        GetAmendsSub: build.query({
            query: (payload: any) => ({
                url: `${API_ROUTES.JOBS.AMENDSREADSUB}${payload}`,
                method: "GET",
            }),
            providesTags: ["Jobs"],
        }),
        GetUserAnalytics: build.query({
            query: (payload: any) => ({
                url: `${API_ROUTES.ANALYTICS.ANALYTIC}${payload?.id}/?year=${payload?.year}`,
                method: "GET",
            }),
            providesTags: ["JobsAnalytics"],
        }),
        GetUserJobAnalyticsList: build.query({
            query: (payload: any) => ({
                url: `${API_ROUTES.ANALYTICS.LIST}${payload}/`,
                method: "GET",
            }),
            providesTags: ["JobsAnalyticsList"],
        }),
    })
})


export const {
    useUploadReportMutation,
    usePreviousJobsQuery,
    useGetTotalJobsQuery,
    useJobDetailsQuery,
    useGetAmendsQuery,
    useUpdateAmendsMutation,
    useUpdateGeneralSuggestionsMutation,
    useUpdateRepaireCostMutation,
    useUpdateBulkAmendsMutation,
    useViewAmendsQuery,
    useGetAmendsSubQuery,
    useGetUserAnalyticsQuery,
    useGetUserJobAnalyticsListQuery
} = jobsApis