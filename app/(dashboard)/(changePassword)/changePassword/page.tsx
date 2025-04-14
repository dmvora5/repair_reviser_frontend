"use client";

import { Button } from "@/components/ui/button";
import { Eye, Forward, PlusIcon, Reply, Trash2, Upload } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import PasswordInput from "@/components/common/form/PasswordInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

const formSchema = z
  .object({
    old_password: z
      .string()
      .min(2, { message: "Old password must be at least 8 characters long" }),
    new_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmpassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.new_password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

const page = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirmpassword: "",
    },
  });


  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center mb-[24px]">
        <div className="flex flex-col flex-1">
          <span className="font-medium text-[32px] leading-[130%] tracking-normal text-white mb-2">
            Change Password
          </span>
          <span className="text-[#8F9DAC] text-[16px] leading-[130%] font-normal">
            You can change your password for the security purpose.
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <PasswordInput
                lcls="text-white"
                form={form}
                name="old_password"
                label="Old password"
                placeHolder="Enter your old password"
                cls="w-full"
              />
               <PasswordInput
                lcls="text-white"
                form={form}
                name="new_password"
                label="New password"
                placeHolder="Enter your new password"
                cls="w-full"
              />
               <PasswordInput
                lcls="text-white"
                form={form}
                name="confirm_password"
                label="Confirm password"
                placeHolder="Enter your confirm password"
                cls="w-full"
              />

              <div className="flex items-center justify-end mt-8 w-full">
                <Button variant={"default"}>
                  <span className="text-[14px] font-medium leading-7">
                    Change Password
                  </span>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default page;
