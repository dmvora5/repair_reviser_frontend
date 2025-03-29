"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Eye, Forward, PlusIcon, Reply, Trash2, Upload } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import PasswordInput from "@/components/common/form/PasswordInput";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
          Help Center
          </span>
          <span className="text-[#8F9DAC] text-[16px] leading-[130%] font-normal">
          Contact us directly in case of any query from your side.
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="w-full">
            <Image 
                src="/helpcenterlogo.svg" 
                height={24} 
                width={100}
                layout="responsive"
                className="!w-full mb-6" 
                alt="logo" 
                />
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <div className="grid grid-cols-2 gap-[18px] mb-[18px]">
               <div className="flex flex-col w-full">
                 <label htmlFor="name" className="block text-[14px] mb-1.5 leading-[24px] text-white font-medium">
                Your Name*
                </label>
                <Input id="name" type="text" placeholder="Enter Your Name" className="" />
                </div>
                <div className="flex flex-col w-full">
                 <label htmlFor="name" className="block text-[14px] mb-1.5 leading-[24px] text-white font-medium">
                 Email*
                </label>
                <Input id="name" type="text" placeholder="Enter Your Email" className="" />
                </div>
            </div>
            <div className="flex flex-col w-full">
                 <label htmlFor="name" className="block text-[14px] mb-1.5 leading-[24px] text-white font-medium">
                 Your Message*
                </label>
                <Textarea id="message" placeholder="Write Your Message Here..." className="" />
            </div>

            <div className="flex items-center justify-end mt-8 w-full">
              <Button variant={"default"}>
                <span className="text-[14px] font-medium leading-7">
                  Submit Request
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
