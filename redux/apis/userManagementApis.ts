import { API_ROUTES } from "@/constant/routes";
import { baseQueryWithAuth } from "@/utils/RtkApiCall";
import { createApi } from "@reduxjs/toolkit/query/react";



export const userManagementApis = createApi({
    baseQuery: baseQueryWithAuth,
    reducerPath: "userManagement",
    tagTypes: ["UserManagement"],
    endpoints: (build) => ({
        createCompanyUser: build.mutation({
            query: (payload: any) => ({
                url: API_ROUTES.USERMANAGEMENT.CREATECOMPANYUSER,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["UserManagement"]
        }),
        allComponyUsersList: build.query({
            query: (payload: any) => ({
                url: API_ROUTES.USERMANAGEMENT.USERLIST + "?ordering=-average_report_value",
                method: "GET",
                params: payload
            }),
            providesTags: ["UserManagement"]
        }),
        updateCompanyUser: build.mutation({
            query: (payload: any) => ({
                url: API_ROUTES.USERMANAGEMENT.EDITPASSWORD + payload?.id + "/",
                method: "PATCH",
                body: payload
            }),
            invalidatesTags: ["UserManagement"]
        }),
        deleteUser: build.mutation({
            query: (payload: any) => ({
                url: API_ROUTES.USERMANAGEMENT.DELETEUSER + payload?.id + "/",
                method: "PATCH",
                body: payload
            }),
            invalidatesTags: ["UserManagement"]
        }),
        changedPassword: build.mutation({
            query: (payload: any) => ({
                url: API_ROUTES.AUTH.CHANGEDPASSWORD,
                method: "POST",
                body: payload
            })
        }),
    })
})


export const {
    useCreateCompanyUserMutation,
    useAllComponyUsersListQuery,
    useUpdateCompanyUserMutation,
    useChangedPasswordMutation,
    useDeleteUserMutation
} = userManagementApis