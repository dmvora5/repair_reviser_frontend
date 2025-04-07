"use client";
import { useState } from "react";
import { useUsedCreditsQuery } from "@/redux/apis/creditsApi"; // adjust the import path as needed

const CreditUsedHistory = () => {
  const [state, setState] = useState<any>({
    page: 1,
    search: "",
  });

  const { data, isLoading, error } = useUsedCreditsQuery(state);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="w-full flex flex-col">
      <span className="text-white font-semibold text-[14px] leading-[130%] mb-2">
        History
      </span>

      <div className="flex flex-col w-full">
        {isLoading ? (
          <div className="text-[#8F9DAC] text-sm py-4">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-sm py-4">Something went wrong!</div>
        ) : (
          (data || []).map((item: any, index: number) => (
            <div
              key={item.created_at || index}
              className="border-b border-[#162332] py-4 flex flex-col"
            >
              <span className="text-[#4A90E2] font-medium text-[16px] tracking-normal leading-[24px] mb-1.5">
                {item.credit_amount} Credits
              </span>
              <span className="text-[#8F9DAC] font-normal text-[14px] leading-[130%] tracking-normal">
                Jack Peterson used credit on {formatDate(item.created_at)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CreditUsedHistory;
