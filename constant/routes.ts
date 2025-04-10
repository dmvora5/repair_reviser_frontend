

export const PAGE_ROUTES = {
    AUTH: {
        LOGIN: "/login",
        REGISTER: "/register",
        FORGETPASSWORD: "/forget-password"
    },
    COMPANY: {
        USERMAMAGEMENT: "/usermanagement",
        DASHBOARD: "/dashboard"
    }
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
        CREATECOMPANYUSER: "user/create-company-user/",
        USERLIST: "user/company-user-list/",
        EDITPASSWORD: "user/company-user-password-update/"
    },
    JOBS: {
        REPORTUPLOAD: "report/upload-file/",
        PREVIOUSJOBS: "report/list-jobs/"
    },
    CREDITS: {
        CREATECREDITS: "payment/enter-credits-amount/",
        GETCREDITS: "payment/purchase-history/",
        USEDCREDITS: "payment/credits-usage-history/",
    }
} 