"use client";

import React, { useState } from "react";
import { CircleMinus, CirclePlus } from "lucide-react";
import { useGetPrivacyAndTermsQuery } from "@/redux/apis/usersApis";
import ProcessLoader from "@/components/ProcessLoader";

const Page = () => {
  const { data, isLoading, error } = useGetPrivacyAndTermsQuery({});
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const faqs = Array.isArray((data as any)?.f_a_q) ? (data as any).f_a_q : [];

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center mb-[24px]">
        <div className="flex flex-col flex-1">
          <span className="font-medium text-[32px] leading-[130%] tracking-normal text-white mb-2">
            FAQs
          </span>
          <span className="text-[#8F9DAC] text-[16px] leading-[130%] font-normal">
            Here are some of the frequently asked questions.
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        {isLoading && (
          <div className="text-white flex justify-center items-center h-[80vh]">
            <ProcessLoader />
          </div>
        )}
        {typeof error === "object" && error !== null && (
          <p className="text-red-500">Failed to load FAQ data.</p>
        )}

        <div className="w-full space-y-3">
          {faqs.length > 0
            ? faqs.map((faq: any, index: number) => (
                <div key={index} className="bg-[#0B1219] p-4 rounded-[12px]">
                  <button
                    className={`w-full flex justify-between items-center text-[16px] leading-[24px] font-medium ${
                      openIndex === index ? "!text-[#4A90E2]" : "text-[#8F9DAC]"
                    } hover:text-[#4A90E2]`}
                    onClick={() => toggleFAQ(index)}
                  >
                    <span>{faq.question}</span>
                    {openIndex === index ? (
                      <CircleMinus className="text-[#DE3140] min-w-5 w-5 h-5" />
                    ) : (
                      <CirclePlus className="text-[#DE3140] min-w-5 w-5 h-5" />
                    )}
                  </button>

                  {openIndex === index && (
                    <p className="mt-1.5 text-[#8F9DAC] font-normal text-[14px] leading-5">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))
            : !isLoading && <p className="text-white">No FAQs found.</p>}
        </div>
      </div>
    </div>
  );
};

export default Page;
