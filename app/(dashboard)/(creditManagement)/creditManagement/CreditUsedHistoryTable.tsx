"use client";
import Image from "next/image";
import { useState } from "react";
import { Trash2 } from "lucide-react";

const CreditUsedHistory = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full flex flex-col">
      <span className="text-white font-semibold text-[14px] leading-[130%]">
        History
      </span>
      <div className="flex flex-col w-full">
        <div className="border-b border-[#162332] py-4 flex flex-col">
          <span className="text-[#4A90E2] font-medium text-[16px]  tracking-normal leading-[24px] mb-1.5">
            1500 Credits
          </span>
          <span className="text-[#8F9DAC] font-normal text-[14px] leading-[130%] tracking-normal">
            Jack peterson used credit on 05.07.2024
          </span>
        </div>
        <div className="border-b border-[#162332] py-4 flex flex-col">
          <span className="text-[#4A90E2] font-medium text-[16px]  tracking-normal leading-[24px] mb-1.5">
            1500 Credits
          </span>
          <span className="text-[#8F9DAC] font-normal text-[14px] leading-[130%] tracking-normal">
            Jack peterson used credit on 05.07.2024
          </span>
        </div>
        <div className="border-b border-[#162332] py-4 flex flex-col">
          <span className="text-[#4A90E2] font-medium text-[16px]  tracking-normal leading-[24px] mb-1.5">
            1500 Credits
          </span>
          <span className="text-[#8F9DAC] font-normal text-[14px] leading-[130%] tracking-normal">
            Jack peterson used credit on 05.07.2024
          </span>
        </div>
        <div className="border-b border-[#162332] py-4 flex flex-col">
          <span className="text-[#4A90E2] font-medium text-[16px]  tracking-normal leading-[24px] mb-1.5">
            1500 Credits
          </span>
          <span className="text-[#8F9DAC] font-normal text-[14px] leading-[130%] tracking-normal">
            Jack peterson used credit on 05.07.2024
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreditUsedHistory;
