"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useContactUsUserMutation } from "@/redux/apis/usersApis";
import { errorToast, sucessToast } from "@/utils";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Message is required"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactUSForm = () => {
  const [submit, { isLoading }] = useContactUsUserMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await submit({
        name: data.name,
        email: data.email,
        message: data.message,
      }).unwrap();

      sucessToast("Submitted Successfully");

      // Reset the form to initial values
      form.reset();
    } catch (error: any) {
      errorToast(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center mb-[24px]">
        {/* <div className="flex flex-col flex-1">
          <span className="font-medium text-[32px] leading-[130%] tracking-normal text-white mb-2">
            Help Center
          </span>
          <span className="text-[#8F9DAC] text-[16px] leading-[130%] font-normal">
            Contact us directly in case of any query from your side.
          </span>
        </div> */}
      </div>
      <div className="flex flex-col">
        <div className="w-full">
          {/* <Image
            src="/helpcenterlogo.svg"
            height={24}
            width={100}
            layout="responsive"
            className="!w-full mb-6"
            alt="logo"
          /> */}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-[18px] mb-[18px]">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="name"
                  className="block text-[14px] mb-1.5 leading-[24px] text-white font-medium"
                >
                  Your Name*
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter Your Name"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <span className="text-red-500 text-sm mt-1">
                    {form.formState.errors.name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor="email"
                  className="block text-[14px] mb-1.5 leading-[24px] text-white font-medium"
                >
                  Email*
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Your Email"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {form.formState.errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="message"
                className="block text-[14px] mb-1.5 leading-[24px] text-white font-medium"
              >
                Your Message*
              </label>
              <Textarea
                id="message"
                placeholder="Write Your Message Here..."
                className="text-white font-medium"
                {...form.register("message")}
              />
              {form.formState.errors.message && (
                <span className="text-red-500 text-sm mt-1">
                  {form.formState.errors.message.message}
                </span>
              )}
            </div>

            {/* <div className="flex items-center justify-end mt-8 w-full">
              <Button type="submit" variant="default" disabled={isLoading}>
                <span className="text-[14px] font-medium leading-7">
                  {isLoading ? "Submitting..." : "Submit Request"}
                </span>
              </Button>
            </div> */}
            <div>
              <button
                className="w-full  text-white py-3 mt-2 text-[14px] font-medium rounded-lg min-h-[48px] bg-[#DE3140] transition"
                style={{ backgroundColor: "#DE3140" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUSForm;
