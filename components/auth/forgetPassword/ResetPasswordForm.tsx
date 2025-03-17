"use client"
import Image from 'next/image'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/components/common/form/PasswordInput'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'
import { useResetPasswordMutation } from '@/redux/apis/usersApis'
import { FORGETPASSWORD_STEP, ResetPasswordFormType, useForgetPassword } from './ForgetPasswordProvider'
import { useEffect } from 'react'
import ApiState from '@/components/ApiState'
import { PAGE_ROUTES } from '@/constant/routes'

const formSchema = z.object({
    email: z.string().email({ message: "Email must be a valid email" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmpassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
}).refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
});
const ResetPasswordForm = () => {

    const { resetPasswordForm, step } = useForgetPassword();
    const [submit, { isLoading, isSuccess, error }] = useResetPasswordMutation();

    async function onSubmit(values: ResetPasswordFormType) {
        await submit(values)
    }

    return (
        <>
            {step === FORGETPASSWORD_STEP.RESETPASSWORD &&
                <div className='text-white bg-black border border-[#242c3c] rounded-[20px] shadow-sm w-[469px] min-h-[482px] py-[30px] px-[48px] space-y-3'>
                    <ApiState isSuccess={isSuccess} error={error}>
                        <ApiState.SuccessMessage message="Password reset successfully!" />
                        <ApiState.SuccessRedirect path={PAGE_ROUTES.AUTH.LOGIN} />
                        <ApiState.Error />
                    </ApiState>
                    <div className="space-y-3">
                        <Image
                            src="/images/AuthLogo.svg"
                            width={131}
                            height={40}
                            alt="Logo"
                            className="p-2 mx-auto"
                        />
                        <h1 className="text-3xl font-medium text-center">Reset Password</h1>
                        <p className='text-[#8F9DAC] text-center'>
                            Kindly Enter New password for your account.                </p>
                    </div>
                    <Form {...resetPasswordForm}>
                        <form onSubmit={resetPasswordForm.handleSubmit(onSubmit)} className="space-y-8">
                            <PasswordInput disabled={isLoading} form={resetPasswordForm} name="password" placeHolder="Password" label="Password" cls='w-full' />
                            <PasswordInput disabled={isLoading} form={resetPasswordForm} name="confirm_password" placeHolder="Confirm Password" label="Confirm Password" cls='w-full' />

                            <Button disabled={isLoading} type="submit" className="auth-button">
                                {isLoading ? (
                                    <Image
                                        src="images/loader.svg"
                                        alt="loader"
                                        width={24}
                                        height={24}
                                        className="ml-2 animate-spin"
                                    />
                                ) : "Continue"}
                            </Button>
                        </form>

                    </Form>
                </div>
            }
        </>
    )
}

export default ResetPasswordForm