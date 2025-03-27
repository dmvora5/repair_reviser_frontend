"use client";

import ApiState from "@/components/ApiState";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateCompanyUserMutation } from "@/redux/apis/userManagementApis";
import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/common/form/PasswordInput";
import Image from "next/image";
import CreatedSuccessfullyPopup from "../CreatedSuccessfullyPopup";

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 8 characters long" }),
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

interface AddNewUserPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewUserPopup: React.FC<AddNewUserPopupProps> = ({
  isOpen,
  onClose,
}) => {

  const [open, setOpen] = useState(false);

  const [submit, { isLoading, error, isSuccess, status, reset }] =
    useCreateCompanyUserMutation();
  console.log({ isLoading, error, isSuccess, status });

  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside of it
  const handleClickOutside = (e: React.MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target as Node) &&
      status !== "pending"
    ) {
      onClose();
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmpassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    submit(values);
  }


  const handleReset = () => {
    onClose();
    form.reset();
    setOpen(true)
  }


  useEffect(() => {
    if (status !== 'fulfilled') return;
    handleReset();
  }, [status])


  if (open) {
    return <CreatedSuccessfullyPopup isOpen={open} onClose={() => setOpen(false)} />
  }

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleClickOutside} // Handle outside click
    >
      <ApiState isSuccess={isSuccess} error={error} reset={reset}>
        {/* <ApiState.SuccessMessage message="uesr created sucessfully!" /> */}
        <ApiState.SuccessCallback />
        <ApiState.Error />
      </ApiState>
      <div
        ref={modalRef}
        className="bg-[#060A0E] text-white px-[48px] py-[30px] rounded-[20px] w-[501px] min-w-[501px] modelGradientBorder"
      >
        {/* Header */}
        <div className="flex justify-center flex-col items-center mb-8 text-center">
          <h2 className="text-[32px] font-medium leading-[130%] tracking-normal mb-3 text-white">
            Add New User
          </h2>
          <span className="text-[#8F9DAC] font-normal text-[14px] leading-[20px] tracking-normal">
            Please Provide username and set password for new user.
          </span>
          {/* <button className="text-gray-400 hover:text-white" onClick={onClose}>
            ✖
          </button> */}
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <div className="flex flex-col mb-[18px]">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-white font-medium text-[14px] leading-[24px] tracking-normal mb-1.5">
                      Enter Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="w-full rounded-[6px] placeholder:text-[#8F9DAC] text-[14px] placeholder:text-[14px] font-normal placeholder:font-normal leading-5 h-[50px] px-4 flex items-center no-focus border border-[#1B2231] bg-[#0C141C]"
                        placeholder="Enter Email Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col mb-[18px]">
              <PasswordInput
                disabled={isLoading}
                form={form}
                name="password"
                placeHolder="Password"
                label="Password"
                cls="w-full"
              />
            </div>
            <div className="flex flex-col mb-[32px]">
              <PasswordInput
                disabled={isLoading}
                form={form}
                name="confirmpassword"
                placeHolder="Confirm Password"
                label="Confirm Password"
                cls="w-full"
              />
            </div>
            <Button disabled={isLoading} type="submit" className="auth-button">
              {isLoading ? (
                <Image
                  src="images/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddNewUserPopup;
