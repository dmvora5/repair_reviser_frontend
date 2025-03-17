"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import PasswordInput from "../common/form/PasswordInput"
import { Button } from "../ui/button"
import Link from "next/link"
import Image from "next/image"
import { useRegisterUserMutation } from "@/redux/apis/usersApis"
import { PAGE_ROUTES } from "@/constant/routes"
import ApiState from "../ApiState"

const formSchema = z.object({
    email: z.string().email({ message: "Email must be a valid email" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmpassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
}).refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
});

const IndividualForm = () => {

    const [submit, { isLoading, isSuccess, error }] = useRegisterUserMutation();



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmpassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await submit({
            email: values.email,
            password: values.password
        });
    }

    return (
        <div className="space-y-8">
            <ApiState isSuccess={isSuccess} error={error}>
                <ApiState.SuccessMessage message="Register sucessfully!" />
                <ApiState.Error />
                <ApiState.SuccessRedirect path={PAGE_ROUTES.AUTH.LOGIN} />
            </ApiState>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div>
                        <FormField
                            control={form.control}
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
                    </div>
                    <div className="flex gap-3">
                        <PasswordInput disabled={isLoading} form={form} name="password" placeHolder="Password" label="Password" />
                        <PasswordInput disabled={isLoading} form={form} name="confirmpassword" placeHolder="Confirm Password" label="Confirm Password" />
                    </div>
                    <Button type="submit" className="auth-button" disabled={isLoading}>
                        {isLoading ? (
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
            <p className="text-center">
                Already have an account? <Link href={PAGE_ROUTES.AUTH.LOGIN} className="text-brandRed">Sign in</Link>
            </p>
        </div>
    );
};

export default IndividualForm;
