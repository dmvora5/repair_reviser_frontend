import { API_ROUTES } from "@/constant/routes";
import { baseQuery } from "@/utils/RtkApiCall";
import { Api, createApi } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    baseQuery: baseQuery,
    reducerPath: "users",
    tagTypes: ["Auth"],
    endpoints: (build: any) => ({
        registerUser: build.mutation({
            query: (payload: any) => ({
                url: API_ROUTES.AUTH.REGESTERUSER,
                method: "POST",
                body: payload
            })
        }),
        forgetPasswoord: build.mutation({
            query: (payload: any) => ({
                url: API_ROUTES.AUTH.FORGETPASSWORD,
                method: "POST",
                body: payload
            })
        }),
        verifyOtp: build.mutation({
            query: (payload: any) => ({
                url: API_ROUTES.AUTH.VERIFYOTP,
                method: "POST",
                body: payload
            })
        }),
        resetPassword: build.mutation({
            query: (payload: any) => ({
                url: API_ROUTES.AUTH.RESETPASSWORD,
                method: "POST",
                body: payload
            })
        }),
        contactUsUser: build.mutation({
            query: (payload: any) => ({
                url: API_ROUTES.AUTH.CONTACTUS,
                method: "POST",
                body: payload
            })
        }),
        getPrivacyAndTerms: build.query({
            query: (payload: any) => ({
                url: API_ROUTES.AUTH.PRIVACY,
                method: "GET",
            })
        }),
        getFaq: build.query({
            query: (payload: any) => ({
                url: API_ROUTES.AUTH.FAQ,
                method: "GET",
            })
        }),
    })
});

export const {
    useRegisterUserMutation,
    useForgetPasswoordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
    useContactUsUserMutation,
    useGetPrivacyAndTermsQuery,
    useGetFaqQuery
} = userApi;