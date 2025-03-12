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

const formSchema = z.object({
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string(),
})

const page = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit() {

    }

    return (
        <div className='text-white bg-black border border-[#242c3c] rounded-[20px] shadow-sm w-[469px] h-[458px] py-[30px] px-[48px] space-y-4'>
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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter OTP</FormLabel>
                                <FormControl>
                                    <InputOTP maxLength={6} {...field}>
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
                        <p className='text-[#8F9DAC] text-center'><span className='text-brandRed'> Resend OTP</span> in 30 Seconds.</p>
                    </div>
                    <Button type="submit" className="auth-button">Send OTP  </Button>
                </form>
            </Form>
        </div>
    )
}

export default page