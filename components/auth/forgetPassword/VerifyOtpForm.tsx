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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { FORGETPASSWORD_STEP, useForgetPassword, VerifyOtpFormType } from './ForgetPasswordProvider'
import { useForgetPasswoordMutation, useVerifyOtpMutation } from '@/redux/apis/usersApis'
import ApiState from '@/components/ApiState'
import { useEffect } from 'react'

const formSchema = z.object({
    otp: z.string().min(6, { message: "OTP must be at least 6 digits long" }),
})

const VerifyOtp = () => {

    const { verifyOtpForm, resetPasswordForm, setStep, step } = useForgetPassword();
    const [submit, { isLoading, isSuccess, error }] = useVerifyOtpMutation();

    const [reSendOtp, resendIOption] = useForgetPasswoordMutation();


    useEffect(() => {
        if (!isSuccess) return;
        resetPasswordForm.setValue('email', verifyOtpForm.getValues().email);
        resetPasswordForm.setValue('code', verifyOtpForm.getValues().code);
        setStep(FORGETPASSWORD_STEP.RESETPASSWORD);
    }, [isSuccess])


    async function onSubmit(values: VerifyOtpFormType) {
        await submit(values);
    }

    async function reSend() {
        await reSendOtp({
            email: verifyOtpForm.getValues().email,
        })
    }

    return (
        <>
            {step === FORGETPASSWORD_STEP.VERIFYOTP &&
                <div className='text-white bg-black border border-[#242c3c] rounded-[20px] shadow-sm w-[469px] min-h-[458px] py-[30px] px-[48px] space-y-4'>
                    <ApiState isSuccess={isSuccess} error={error}>
                        <ApiState.SuccessMessage message="OTP Verifye Successfully!" />
                        <ApiState.Error />
                    </ApiState>
                    <ApiState isSuccess={resendIOption.isSuccess} error={resendIOption.error}>
                        <ApiState.SuccessMessage message="OTP Verifye Successfully!" />
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
                        <h1 className="text-3xl font-medium text-center">Verify OTP</h1>
                        <p className='text-[#8F9DAC] text-center'>
                            Kindly enter the OTP which is sent to your enterted email address.
                        </p>
                    </div>
                    <Form {...verifyOtpForm}>
                        <form onSubmit={verifyOtpForm.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={verifyOtpForm.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter OTP</FormLabel>
                                        <FormControl>
                                            <InputOTP disabled={isLoading || resendIOption.isLoading} maxLength={6} {...field} >
                                                <InputOTPGroup className="shad-otp">
                                                    <InputOTPSlot index={0} className="shad-otp-slot" />
                                                    <InputOTPSlot index={1} className="shad-otp-slot" />
                                                    <InputOTPSlot index={2} className="shad-otp-slot" />
                                                    <InputOTPSlot index={3} className="shad-otp-slot" />
                                                    <InputOTPSlot index={4} className="shad-otp-slot" />
                                                    <InputOTPSlot index={5} className="shad-otp-slot" />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <p className='text-[#8F9DAC] text-center'><span className='text-brandRed hover:cursor-pointer' onClick={reSend}> Resend OTP</span> in 30 Seconds.</p>
                            </div>
                            <Button disabled={isLoading || resendIOption.isLoading} type="submit" className="auth-button">
                                {isLoading ? (
                                    <Image
                                        src="images/loader.svg"
                                        alt="loader"
                                        width={24}
                                        height={24}
                                        className="ml-2 animate-spin"
                                    />
                                ) : "Verify"}
                            </Button>
                        </form>
                    </Form>
                </div>
            }
        </>
    )
}

export default VerifyOtp