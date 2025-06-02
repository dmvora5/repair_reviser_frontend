"use client";

import React, { useState } from "react";
import { CircleMinus, CirclePlus } from "lucide-react";
import { useGetFaqQuery, useGetPrivacyAndTermsQuery } from "@/redux/apis/usersApis";
import ProcessLoader from "@/components/ProcessLoader";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const ImageWithSkeleton = ({ src, alt, className, fallbackSrc }: any) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <>
      {loading && !error && (
        // Skeleton placeholder while loading
        <div
          className={`w-full h-48 bg-gray-300 animate-pulse ${className}`}
          aria-busy="true"
          aria-label="Loading image"
        />
      )}
      <Zoom>
        <img
          src={error ? fallbackSrc : src}
          alt={alt}
          className={`${loading ? "hidden" : "block"} ${className}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        />
      </Zoom>
    </>
  );
};

const Page = () => {
  const { data: faqs, isLoading, error } = useGetFaqQuery({});
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };


  // const faqs = Array.isArray((data as any)?.f_a_q) ? (data as any).f_a_q : [];

  // const faqs = [
  //   {
  //     question: "test question",
  //     answer: `If the guide number on an operation includes “KN”, “ZAX” or “NO NUMBER” then the labour times provided are not from the manufacturer. Any operation including these must have the labour WU’s checked to see if they are reasonable for the repair required. It is good practice to compare labour times from different sources, such as “Thatcham methods”.`,
  //     images: ""
  //   }
  // ]

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
          {(faqs as any)?.length > 0
            ? (faqs as any).map((faq: any, index: number) => (
              <div key={faq?.id} className="bg-[#0B1219] p-4 rounded-[12px]">
                <button
                  className={`w-full flex justify-between items-center text-[16px] leading-[24px] font-medium ${openIndex === index ? "!text-[#4A90E2]" : "text-[#8F9DAC]"
                    } hover:text-[#4A90E2]`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.title}</span>
                  {openIndex === index ? (
                    <CircleMinus className="text-[#DE3140] min-w-5 w-5 h-5" />
                  ) : (
                    <CirclePlus className="text-[#DE3140] min-w-5 w-5 h-5" />
                  )}
                </button>

                {openIndex === index && (
                  <div className="flex gap-8 p-4">
                    {faq?.img &&
                      <div className="w-1/2">
                        <ImageWithSkeleton
                          src={faq?.img}
                          alt="image"
                          className="w-full"
                          fallbackSrc="/images/P.jpg"
                        />
                      </div>
                    }
                    <div>
                      <p className="mt-1.5 text-[#8F9DAC] font-normal text-[14px] leading-5">
                        {faq.description}
                      </p>
                    </div>
                  </div>
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
