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
        <div className='text-white bg-black border border-[#242c3c] rounded-[20px] shadow-sm w-[469px] h-[482px] py-[30px] px-[48px] space-y-3'>
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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <PasswordInput form={form} name="password" placeHolder="Password" label="Password" cls='w-full' />
                    <PasswordInput form={form} name="password" placeHolder="Password" label="Password" cls='w-full' />

                    <Button type="submit" className="auth-button">Send OTP  </Button>
                </form>

            </Form>
        </div>
    )
}

export default page