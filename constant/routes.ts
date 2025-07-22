

export const PAGE_ROUTES = {
    AUTH: {
        LOGIN: "/login",
        REGISTER: "/register",
        FORGETPASSWORD: "/forget-password"
    },
    COMPANY: {
        USERMAMAGEMENT: "/userManagement",
        DASHBOARD: "/dashboard"
    },
    CREDIT: {
        CREDITMANAGEMENT: "/creditManagement"
    },
    JOBS: {
        NEWJOBS: "/newJobs",
        JOBDETAILS: "/previousJobs/",
        AMENDSREAD: "/previousJobs/amends-agreed/",
        VIEWAGGRED: "/previousJobs/amends-agreed/view-aggreed/"
    },
    FAQ: "/faqs",
    POLICY: "/privacy",
    TEARMS: "/terms-condition",
    ANALYTICS: "/analytics/"
}


export const API_ROUTES = {
    AUTH: {
        LOGIN: "user/login-user/",
        REGESTERUSER: "user/register-user/",
        FORGETPASSWORD: "user/request-password-reset/",
        VERIFYOTP: "user/verify-otp/",
        RESETPASSWORD: "user/password-reset/",
        LOGINCOMPANYUSER: "user/login-company-user/",
        CHANGEDPASSWORD: "user/change-password/",
        CONTACTUS: "/user/contact-us/",
        PRIVACY: "/platform-admin/site-content/",
        FAQ: "/platform-admin/faq-list/"
    },
    USERMANAGEMENT: {
        CREATECOMPANYUSER: "user/create-company-user/",
        USERLIST: "user/company-user-list/",
        EDITPASSWORD: "user/company-user-password-update/",
        DELETEUSER: "user/company-user-active-deactive/"
    },
    JOBS: {
        REPORTUPLOAD: "report/upload-file/",
        PREVIOUSJOBS: "report/list-jobs/",
        TOTALJOBS: "report/total-jobs/",
        JOBDETAILS: "report/job-details/",
        AMENDSREAD: "/report/amends-agreed/",
        AMENDSREADSUB: "/report/amends-agreed-by-subdesc/",
        AMENDSUPDATE: "/report/amends/agree/",
        UPDATEGENERALSUGGESTION: "/report/general-suggestion/",
        UPDATEREPAIRECOST: "/report/update-repair-cost/",
        AMANDBULKUPDATE: "/report/bulk-amends/agree-disagree/",
        VIEWAGGREDAMANDS: "/report/amends-agreed/"
    },
    CREDITS: {
        CREATECREDITS: "payment/enter-credits-amount/",
        GETCREDITS: "payment/purchase-history/",
        USEDCREDITS: "payment/credits-usage-history/",
        TOTALCREDITS: "user/available-credits/",
        PRICE: "user/credit-price/"
    },
    ANALYTICS: {
        ANALYTIC: "report/company-user-statistics/",
        LIST: "report/company-user-job-list/"
    }
} 