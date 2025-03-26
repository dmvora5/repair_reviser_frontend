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
            })
        }),
        allComponyUsersList: build.query({
            query: (payload: any) => ({
                url: API_ROUTES.USERMANAGEMENT.USERLIST,
                method: "GET",
                params: payload
            })
        })
    })
})


export const {
    useCreateCompanyUserMutation,
    useAllComponyUsersListQuery
} = userManagementApis