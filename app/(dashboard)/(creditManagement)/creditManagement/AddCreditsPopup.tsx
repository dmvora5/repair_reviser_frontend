"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useRef, useState } from "react";
import StripePayment from "@/components/StripePayment";
import { useCretaCreditsMutation } from "@/redux/apis/creditsApi";
import ApiState from "@/components/ApiState";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface AddCreditsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  credit_amount: z
    .string() // Treat the input as a string (because HTML form values are strings)
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 5, {
      message: "Please enter credit amount greater than or equal to 5",
    })
    .transform((val) => Number(val)), // Convert to number after validation
});

const AddCreditsPopup: React.FC<AddCreditsPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [createCredits, { isLoading, error, isSuccess }] = useCretaCreditsMutation();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside of it
  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node) && !isLoading) {
      onClose();
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      credit_amount: "" as any, // Set default value as a number
    }, 
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Convert string to number explicitly before passing to Zod
    const creditAmount = parseFloat(values.credit_amount.toString());
    try {
      const response = await createCredits({ credit_amount: creditAmount }).unwrap();
      console.log("🚀 ~ handleAddCredits ~ response:", response)
      if (response.client_secret) {
        setClientSecret(response.client_secret);
      } else {
        console.error("Failed to get client secret:", response);
      }
    } catch (error) {
      console.log("Error creating payment intent:", error);
    }
  }


  return (
    <>
      {!clientSecret && isOpen &&
        <Form {...form}>
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={handleClickOutside} // Handle outside click
          >
            <ApiState error={error} isSuccess={isSuccess}>
              <ApiState.ArthorizeCheck />
            </ApiState>
            <div
              ref={modalRef}
              className="bg-[#060A0E] text-white px-[48px] py-[30px] rounded-[20px] w-[501px] min-w-[501px] modelGradientBorder"
            >
              {/* Header */}
              <div className="flex justify-center flex-col items-center mb-8 text-center">
                <h2 className="text-[32px] font-medium leading-[130%] tracking-normal mb-3 text-white">
                  Add Credits
                </h2>
                <span className="text-[#8F9DAC] font-normal text-[14px] leading-[20px] tracking-normal">
                  Enter Amount of Credit which you want to add
                </span>
              </div>

              {/* Form */}
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                  <div className="flex flex-col mb-[32px]">
                    <FormField
                      control={form.control}
                      name="credit_amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-white font-medium text-[14px] leading-[24px] tracking-normal mb-1.5">
                            Enter Credit
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isLoading}
                              className="w-full rounded-[6px] placeholder:text-[#8F9DAC] text-[14px] placeholder:text-[14px] font-normal placeholder:font-normal leading-5 h-[50px] px-4 flex items-center no-focus border border-[#1B2231] bg-[#0C141C]"
                              placeholder="Enter Here"
                              {...field} // bind form field value
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="auth-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Image
                        src="images/loader.svg"
                        alt="loader"
                        width={24}
                        height={24}
                        className="ml-2 animate-spin"
                      />
                    ) : (
                      <>
                        Pay via{" "}
                        <Image
                          src="/images/stripe.png"
                          height={24}
                          width={90}
                          className="!min-w-[90px] !w-[90px]"
                          alt="Jobs"
                        />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div >
        </Form >
      }
      {clientSecret && <StripePayment clientSecret={clientSecret} setClientSecret={setClientSecret} parentModelClose={onClose} />}
    </>
  );
};

export default AddCreditsPopup;
