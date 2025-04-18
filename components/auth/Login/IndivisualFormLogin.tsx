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
import { getSession, signIn } from 'next-auth/react'
import { parseAndShowErrorInToast, sucessToast } from '@/utils'
import { PAGE_ROUTES } from '@/constant/routes'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    // company_name: z.string().nonempty({ message: 'Company Name not provided' }),
    email: z.string().min(2, {
        message: "username must be at least 2 characters.",
    }),
    password: z.string().min(1, { message: "Password must be at least 1 character" }),
})

const IndivisualFormLogin = () => {


    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            // company_name: ""

        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setLoading(true)
        try {
            const res: any = await signIn('credentials', {
                email: values?.email,
                password: values?.password,
                // company_name: values?.company_name,
                redirect: false
            })

            if (!res?.ok) {
                return parseAndShowErrorInToast(res);
            }

            if (res && res.ok) {
                const session: any = await getSession();
                sucessToast("Login sussfully!");
                if (session?.access_token) {
                    router.replace(PAGE_ROUTES.JOBS.NEWJOBS)
                }
            }

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                                <Input disabled={loading} className="auth-input" placeholder="Enter Company Name" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input disabled={loading} className="auth-input" placeholder="Enter Your Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <PasswordInput disabled={loading} form={form} name="password" placeHolder="Password" label="Password" cls='w-full mb-2' />
                    <p className='text-right'>
                        <Link href={PAGE_ROUTES.AUTH.FORGETPASSWORD} className='text-brandRed'>Forget Password?</Link>
                    </p>
                </div>
                {/* <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem className='flex'>
                    <Checkbox id="terms" className='bg-white h-6 w-6 mr-2' />
                    <FormLabel
                        className="inline-block text-[#8F9DAc]"
                    >
                        Remember me
                    </FormLabel>
                </FormItem>
            )}
        /> */}
                <Button type="submit" disabled={loading} className="auth-button">
                    {loading ? (
                        <Image
                            src="images/loader.svg"
                            alt="loader"
                            width={24}
                            height={24}
                            className="ml-2 animate-spin"
                        />
                    ) : "Sign In"}
                </Button>
            </form>
            <p className="text-center text-[#8F9DAc]">Don't have an account? <Link href={PAGE_ROUTES.AUTH.REGISTER} className="text-brandRed">Sign Up</Link></p>

        </Form>
    )
}

export default IndivisualFormLogin