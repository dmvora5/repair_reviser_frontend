"use client";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/common/form/PasswordInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { parseAndShowErrorInToast, sucessToast } from "@/utils";
import { PAGE_ROUTES } from "@/constant/routes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyLoginForm from "@/components/auth/Login/CompanyLOginForm";
import IndivisualFormLogin from "@/components/auth/Login/IndivisualFormLogin";

const formSchema = z.object({
  company_name: z.string().nonempty({ message: "Company Name not provided" }),
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(1, { message: "Password must be at least 1 character" }),
});

const page = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      company_name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setLoading(true);
    try {
      const res: any = await signIn("credentials", {
        email: values?.email,
        password: values?.password,
        company_name: values?.company_name,
        redirect: false,
      });

      if (!res?.ok) {
        return parseAndShowErrorInToast(res);
      }

      if (res && res.ok) {
        const session: any = await getSession();
        sucessToast("Login sussfully!");
        //change in future
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="text-white bg-black border border-[#242c3c] rounded-[20px] shadow-sm w-[469px] min-h-[666px] py-[30px] px-[48px] space-y-4">
      <Tabs defaultValue="Individual" className="py-[30px] space-y-8">
        <div className="space-y-4">
          <div className="space-y-4">
            <Image
              src="/images/AuthLogo.svg"
              width={131}
              height={40}
              alt="Logo"
              className="p-2 mx-auto"
            />
            <h1 className="text-3xl font-medium text-center">
              Log In to Your Account
            </h1>
          </div>
          <TabsList className="grid w-full grid-cols-2 bg-black">
            <TabsTrigger
              value="Individual"
              className="transition-none rounded-none data-[state=active]:bg-black data-[state=active]:text-brandRed data-[state=active]:border-b-brandRed data-[state=active]:font-bold data-[state=active]:border-b-2 text-[#8f9dac] pb-2"
            >
              Individual
            </TabsTrigger>
            <TabsTrigger
              value="Company"
              className="transition-none rounded-none data-[state=active]:bg-black data-[state=active]:text-brandRed data-[state=active]:border-b-brandRed data-[state=active]:font-bold data-[state=active]:border-b-2 text-[#8f9dac] pb-2"
            >
              Company
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="Individual">
          <IndivisualFormLogin />
        </TabsContent>
        <TabsContent value="Company">
          <CompanyLoginForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
