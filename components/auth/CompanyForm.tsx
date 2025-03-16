"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import PasswordInput from "../common/form/PasswordInput"
import { Button } from "../ui/button"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"


const formSchema = z.object({
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    companyName: z.string(),
    password: z.string(),
    confirmpassword: z.string()
})

const CompanyForm = () => {

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            companyName: "",
            password: "",
            confirmpassword: ""
        },
    })

    async function onSubmit() {

    }

    return (
        <div className=" space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex gap-3 w-full">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-[50%]">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} className="auth-input" placeholder="Enter Email Address" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                                <FormItem className="w-[50%]">
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} className="auth-input" placeholder="Enter Company Address" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-3">
                        <PasswordInput disabled={loading} form={form} name="password" placeHolder="Password" label="Password" />
                        <PasswordInput disabled={loading} form={form} name="confirmpassword" placeHolder="Confirm Password" label="Confirm Password" />
                    </div>
                    <Button disabled={loading} type="submit" className="auth-button">
                        {loading ? (
                            <Image
                                src="images/loader.svg"
                                alt="loader"
                                width={24}
                                height={24}
                                className="ml-2 animate-spin"
                            />
                        ) : "Sign Up"}
                    </Button>
                </form>
            </Form>
            <p className="text-center">Already have an account? <Link href="/" className="text-brandRed">Sign in</Link></p>
        </div>
    )
}

export default CompanyForm