"use client";

import React, { useState } from "react";
import { CircleMinus, CirclePlus, Minus, PlusIcon } from "lucide-react"; // Corrected icons

const Page = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Typed state

  const toggleFAQ = (index: number) => {
    // Explicitly typed index
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Lorem ipsum dolor sit amet, consectetur ?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas tempus nisi. Vestibulum ultricies igula nec purus tincidunt lobortis.",
    },
    {
      question: "Egestas tempus nisi. Vestibulum ultricies ?",
      answer: "Answer to second question goes here.",
    },
    {
      question: "Igula nec purus tincidunt lobortis ?",
      answer: "Answer to third question goes here.",
    },
    {
      question:
        "Egestas justo. Maecenas vestibulum orci at nulla tempor, et rutrum ?",
      answer: "Answer to fourth question goes here.",
    },
  ];

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
        <div className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#0B1219] p-4 rounded-[12px]">
              <button
                className={`w-full flex justify-between items-center text-[16px] leading-[24px] font-medium text-[#8F9DAC] hover:text-[#4A90E2] ${
                  openIndex === index ? "!text-[#4A90E2]" : "text-[#8F9DAC]"
                } `}
                onClick={() => toggleFAQ(index)}
              >
                <span className="">{faq.question}</span>
                {openIndex === index ? (
                  <CircleMinus className="text-[#DE3140] min-w-5 w-5 h-5" />
                ) : (
                  <CirclePlus className="text-[#DE3140] min-w-5 w-5 h-5" />
                )}
              </button>
              {openIndex === index && (
                <p className="mt-1.5 text-[#8F9DAC] font-normal text-[14px] leading-5 ">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
