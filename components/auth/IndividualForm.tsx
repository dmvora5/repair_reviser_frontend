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
import { useRouter } from "next/navigation"

const formSchema = z.object({
    email: z.string().email({ message: "Email must be a valid email" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmpassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
}).refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
});

const IndividualForm = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmpassword: ""
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: data.email, password: data.password }),
            });

            if (res.ok) {
                router.push("/login"); // Redirect after successful registration
            } else {
                const errorData = await res.json();
                alert(errorData.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-8">
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
                                        <Input className="auth-input" placeholder="Enter Email Address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-3">
                        <PasswordInput form={form} name="password" placeHolder="Password" label="Password" />
                        <PasswordInput form={form} name="confirmpassword" placeHolder="Confirm Password" label="Confirm Password" />
                    </div>
                    <Button type="submit" className="auth-button" disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </Form>
            <p className="text-center">
                Already have an account? <Link href="/login" className="text-brandRed">Sign in</Link>
            </p>
        </div>
    );
};

export default IndividualForm;
