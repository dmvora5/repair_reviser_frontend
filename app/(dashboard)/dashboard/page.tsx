"use client";

import { Button } from "@/components/ui/button";
import { Eye, Forward, PlusIcon, Reply, Trash2, Upload } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center mb-8">
        <div className="flex flex-col flex-1">
          <span className="font-medium text-[32px] leading-[130%] tracking-normal text-white mb-2">
            Welcome Back!
          </span>
          <span className="text-[#8F9DAC] text-[16px] leading-[130%] font-normal">
            Here’s what’s happening with your reports
          </span>
        </div>
        <Button variant={"default"}>
          <span className="text-[14px] font-medium leading-7">
            Upload New PDF
          </span>
          <Upload className="w-[24px]" />
        </Button>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col mb-4">
          <h3 className="text-white font-medium leading-[130%] text-[18px] tracking-normal mb-1 text-left">
            Recent Reports
          </h3>
          <span className="text-[#8F9DAC] text-[12px] leading-[130%] font-normal">
            Your most recently processed estimates
          </span>
        </div>
        <div className="w-full">
          <table className="w-full border-collapse text-white">
            <thead>
              <tr className="space-x-1 flex">
                <th className="py-3 px-4 flex-1 font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                  Job Name
                </th>
                <th className="py-3 px-4 font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] min-w-[176px]">
                  Date Uploaded
                </th>
                <th className="py-3 px-4 w-[92px] justify-center min-w-[92px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex space-x-1 *:px-4 *:border-b *:border-[#162332] *:min-h-[56px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="flex-1 truncate">
                  <Image
                    src="/pdfIcon.svg"
                    width={30}
                    height={30}
                    className="min-w-[30px] mr-3"
                    alt="pdf"
                  />
                  AT09ZAC
                </td>
                <td className="min-w-[176px]">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px] gap-3 flex items-center">
                  <button className="text-[#8F9DAC] hover:text-white">
                    <Eye className="w-[20px]" />
                  </button>
                  <button className="text-[#4A90E2] hover:text-white">
                    <Forward className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[56px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="flex-1 truncate">
                  <Image
                    src="/pdfIcon.svg"
                    width={30}
                    height={30}
                    className="min-w-[30px] mr-3"
                    alt="pdf"
                  />
                  AT09ZAC
                </td>
                <td className="min-w-[176px]">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px] gap-3 flex items-center">
                  <button className="text-[#8F9DAC] hover:text-white">
                    <Eye className="w-[20px]" />
                  </button>
                  <button className="text-[#4A90E2] hover:text-white">
                    <Forward className="w-[20px]" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
