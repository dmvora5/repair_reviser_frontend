"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import PasswordInput from "@/components/common/form/PasswordInput";
import IndividualForm from "@/components/auth/IndividualForm";
import CompanyForm from "@/components/auth/CompanyForm";



export default function Home() {





  return (
    <div className="text-white bg-black border border-[#242c3c] rounded-[20px] shadow-sm w-[834px] h-[566px]">
      <Tabs defaultValue="Individual" className="py-[30px] px-[48px] space-y-6">
        <div className="space-y-4">
          <div className="space-y-4">
            <Image
              src="/images/AuthLogo.svg"
              width={131}
              height={40}
              alt="Logo"
              className="p-2 mx-auto"
            />
            <h1 className="text-3xl font-medium text-center">Sign Up Your Account As</h1>
          </div>
          <TabsList className="grid w-full grid-cols-2 bg-black">
            <TabsTrigger value="Individual" className="transition-none rounded-none data-[state=active]:bg-black data-[state=active]:text-brandRed data-[state=active]:border-b-brandRed data-[state=active]:font-bold data-[state=active]:border-b-2 text-[#8f9dac] pb-2">Account</TabsTrigger>
            <TabsTrigger value="Company" className="transition-none rounded-none data-[state=active]:bg-black data-[state=active]:text-brandRed data-[state=active]:border-b-brandRed data-[state=active]:font-bold data-[state=active]:border-b-2 text-[#8f9dac] pb-2">Company</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="Individual">
            <IndividualForm />
        </TabsContent>
        <TabsContent value="Company">
            <CompanyForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
