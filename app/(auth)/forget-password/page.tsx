"use client"
import ForgetPasswordForm from '@/components/auth/forgetPassword/ForgetPasswordForm'
import ForgetPasswordProvider from '@/components/auth/forgetPassword/ForgetPasswordProvider'
import ResetPasswordForm from '@/components/auth/forgetPassword/ResetPasswordForm'
import VerifyOtp from '@/components/auth/forgetPassword/VerifyOtpForm'




const page = () => {





    return (
        <ForgetPasswordProvider>
            <ForgetPasswordForm />
            <VerifyOtp />
            <ResetPasswordForm />
        </ForgetPasswordProvider>
    )
}

export default page