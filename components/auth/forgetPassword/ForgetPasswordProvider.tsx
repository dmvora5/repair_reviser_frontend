'use client'
import { createContext, useContext, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const FORGETPASSWORD_STEP = {
    FORGETPASSWORD: "FORGETPASSWORD",
    VERIFYOTP: "VERIFYOTP",
    RESETPASSWORD: "RESETPASSWORD"
}


const forgetPasswordFormSchema = z.object({
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});


const verifyOtpFormSchema = z.object({
    code: z.string().min(6, { message: "OTP must be at least 6 digits long" }),
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});


const resetPasswordFormSchema = z.object({
    email: z.string().email({ message: "Email must be a valid email" }),
    code: z.string().min(6, { message: "OTP must be at least 6 digits long" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirm_password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
});


export type ForgetPasswordFormType = z.infer<typeof forgetPasswordFormSchema>;
export type VerifyOtpFormType = z.infer<typeof verifyOtpFormSchema>;
export type ResetPasswordFormType = z.infer<typeof resetPasswordFormSchema>;

interface ForegtePasswordContexValues {
    forgetPasswordForm: ReturnType<typeof useForm<ForgetPasswordFormType>>;
    verifyOtpForm: ReturnType<typeof useForm<VerifyOtpFormType>>;
    resetPasswordForm: ReturnType<typeof useForm<ResetPasswordFormType>>;
    setStep: (value: string) => void;
    step: string;
}

const ForgetPasswordContext = createContext({} as ForegtePasswordContexValues)


const ForgetPasswordProvider = ({ children }: { children: React.ReactNode }) => {

    const [step, setStep] = useState(FORGETPASSWORD_STEP.FORGETPASSWORD);


    const forgetPasswordForm = useForm<ForgetPasswordFormType>({
        resolver: zodResolver(forgetPasswordFormSchema),
        defaultValues: {
            email: "",
        },
    });


    const verifyOtpForm = useForm<VerifyOtpFormType>({
        resolver: zodResolver(verifyOtpFormSchema),
        defaultValues: {
            code: "",
            email: "",
        },
    });


    const resetPasswordForm = useForm<ResetPasswordFormType>({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            email: "",
            confirm_password: "",
        },
    })



    return (
        <ForgetPasswordContext.Provider value={{ forgetPasswordForm, verifyOtpForm, resetPasswordForm, setStep, step }}>
            {children}
        </ForgetPasswordContext.Provider>
    )
}

export const useForgetPassword = () => {
    return useContext(ForgetPasswordContext);
}

export default ForgetPasswordProvider