

export const PAGE_ROUTES = {
    AUTH: {
        LOGIN: "/login",
        REGISTER: "/register",
        FORGETPASSWORD: "/forget-password"
    },
}


export const API_ROUTES = {
    AUTH: {
        LOGIN: "user/login-user/",
        REGESTERUSER: "user/register-user/",
        FORGETPASSWORD: "user/request-password-reset/",
        VERIFYOTP: "user/verify-otp/",
        RESETPASSWORD: "user/password-reset/",
        LOGINCOMPANYUSER: "user/login-company-user/"
    },
    USERMANAGEMENT: {
        CREATECOMPANYUSER: "user/create-company-user/"
    },
    JOBS: {
        REPORTUPLOAD: "report/upload-file/",
        PREVIOUSJOBS: "report/list-jobs/"
    }
} 