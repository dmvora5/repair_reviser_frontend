'use client'

import Image from "next/image"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import ApiState from "@/components/ApiState"
import { useForgetPasswoordMutation } from "@/redux/apis/usersApis"
import { useEffect } from "react"
import { FORGETPASSWORD_STEP, ForgetPasswordFormType, useForgetPassword } from "./ForgetPasswordProvider"



const ForgetPasswordForm = () => {

    const [submit, { isLoading, isSuccess, error }] = useForgetPasswoordMutation();

    const { forgetPasswordForm, verifyOtpForm, setStep, step } = useForgetPassword();


    useEffect(() => {
        if (!isSuccess) return;
        verifyOtpForm.setValue('email', forgetPasswordForm.getValues().email);
        setStep(FORGETPASSWORD_STEP.VERIFYOTP);
    }, [isSuccess])

    async function onSubmit(values: ForgetPasswordFormType) {
        await submit(values);
    }

    return (
        <>
            {step === FORGETPASSWORD_STEP.FORGETPASSWORD &&
                (<div className='text-white bg-black border border-[#242c3c] rounded-[20px] shadow-sm w-[469px] min-h-[404px] py-[30px] px-[48px] space-y-4'>
                    <ApiState isSuccess={isSuccess} error={error}>
                        <ApiState.SuccessMessage message="OTP sent on email!" />
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
                        <h1 className="text-3xl font-medium text-center">Forgot Password?</h1>
                        <p className='text-[#8F9DAC] text-center'>
                            Kindly enter the email address to get the OTP to reset your password.
                        </p>
                    </div>
                    <Form {...forgetPasswordForm}>
                        <form onSubmit={forgetPasswordForm.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={forgetPasswordForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input disabled={isLoading} className="auth-input" placeholder="Enter Email Address" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button disabled={isLoading} type="submit" className="auth-button">
                                {isLoading ? (
                                    <Image
                                        src="images/loader.svg"
                                        alt="loader"
                                        width={24}
                                        height={24}
                                        className="ml-2 animate-spin"
                                    />
                                ) : "Send OTP"}  </Button>
                        </form>
                    </Form>
                </div>)
            }
        </>
    )
}

export default ForgetPasswordForm