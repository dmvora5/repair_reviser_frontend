"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Eye, Forward, PlusIcon, Reply, Trash2, Upload } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import PasswordInput from "@/components/common/form/PasswordInput";

const page = () => {
  const form = useForm({
    defaultValues: {
      password: "",
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* <PasswordInput
              form={form}
              name="password"
              label="Password"
              placeHolder="Enter your password"
            /> */}

            <div className="flex items-center justify-end mt-8 w-full">
              <Button variant={"default"}>
                <span className="text-[14px] font-medium leading-7">
                  Change Password
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
