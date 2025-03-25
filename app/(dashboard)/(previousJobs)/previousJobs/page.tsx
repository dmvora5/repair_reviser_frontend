"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Eye, Forward, PlusIcon, Reply, Search, Trash2, Upload } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center mb-8">
        <div className="flex flex-col flex-1">
          <span className="font-medium text-[32px] leading-[130%] tracking-normal text-white mb-2">
          Previous Jobs
          </span>
          <span className="text-[#8F9DAC] text-[16px] leading-[130%] font-normal">
          View and manage past estimates.
          </span>
        </div>
      </div>
      <div className="flex flex-col">
      <div className="w-full min-h-[50px] flex items-center gap-2 mb-4">
            <div className="bg-[#0C141C] border border-[#1B2231] h-[50px] rounded-[6px] flex items-center flex-1 px-4">
              <Search width={20} height={20} color="white" />
              <Input
                className="border-none text-xl no-focus placeholder:text-[#8F9DAC] text-white font-medium text-[14px] tracking-normal leading-5 pr-0"
                placeholder="Search here what you are looking for..."
              />
            </div>
            <Button variant={"default"}>
              <span className="text-[14px] font-medium leading-7">
              Filter
              </span>
            </Button>
            <Button
              variant={"default"}
              size="icon"
            >
              <ArrowRight className="w-5 min-w-5" />
            </Button>
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
                <th className="py-3 px-4 font-medium text-[14px] min-w-[174px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                Status
                </th>
                <th className="py-3 px-4 w-[92px] justify-center min-w-[92px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex space-x-1 *:px-4 *:border-b *:border-[#162332] *:min-h-[56px] *:h-[56px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
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
                <td className="min-w-[176px] !text-[#E2914A] !font-semibold text-[14px] ">NOT REVIEWED</td>
                <td className="w-[92px] justify-center min-w-[92px] gap-3 flex items-center">
                  <button className="text-[#4A90E2] hover:text-white">
                    <Download className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[56px] *:h-[56px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
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
                <td className="min-w-[176px] !text-[#4AE257] !font-semibold">REVIEWED</td>
                <td className="w-[92px] justify-center min-w-[92px] gap-3 flex items-center">
                  <button className="text-[#4A90E2] hover:text-white">
                    <Download className="w-[20px]" />
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
