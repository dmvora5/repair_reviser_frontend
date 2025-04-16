"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import PasswordInput from "@/components/common/form/PasswordInput";
import { useChangedPasswordMutation } from "@/redux/apis/userManagementApis";
import ApiState from "@/components/ApiState";
import Image from 'next/image'
import { signOut } from "next-auth/react";

const formSchema = z
  .object({
    old_password: z
      .string()
      .min(2, { message: "Old password must be at least 8 characters long" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmpassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      old_password: "",
      password: "",
      confirmpassword: "",
    },
  });

  const [changePassword, { isLoading, isSuccess, isError, error }] =
    useChangedPasswordMutation();

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        old_password: data.old_password,
        password: data.password,
      };
      const response = await changePassword(payload).unwrap();
      form.reset();
    } catch (err) {
      console.error("Error changing password:", err);
    }
  };

  const callback = async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    })
    await signOut({
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}`,
    });
  }

  return (
    <div className="flex flex-col flex-1">
      <ApiState isSuccess={isSuccess} error={error}>
        <ApiState.Error />
        <ApiState.SuccessMessage message="Password updated successfully!" />
        <ApiState.SuccessCallback callback={callback} />
        <ApiState.ArthorizeCheck />
      </ApiState>
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
                name="password"
                label="New password"
                placeHolder="Enter your new password"
                cls="w-full"
              />
              <PasswordInput
                lcls="text-white"
                form={form}
                name="confirmpassword"
                label="Confirm password"
                placeHolder="Enter your confirm password"
                cls="w-full"
              />

              <div className="flex items-center justify-end mt-8 w-full">
                <Button type="submit" disabled={isLoading} className="w-28 text-center">
                  <span className="text-[14px] font-medium leading-7">
                    {isLoading ? (
                      <Image
                        src="images/loader.svg"
                        alt="loader"
                        width={24}
                        height={24}
                        className="ml-2 animate-spin"
                      />
                    ) : (
                      "Change Password"
                    )}
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

export default Page;
