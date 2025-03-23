"use client";
import Image from "next/image";
import { useState } from "react";
import { Trash2 } from "lucide-react";

const CreditUsedHistoryTable = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full">
      <table className="w-full border-collapse text-white">
        <thead>
          <tr className="space-x-1 flex">
            <th className="py-3 px-4 w-[50%] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
              Credits
            </th>
            <th className="py-3 px-4 w-[50%] justify-end min-w-[92px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-end">
              Added On
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
            <td className="flex-1 truncate w-[50%]">1500</td>
            <td className="min-w-fit w-[50%] text-right justify-end">
              05/07/2024
            </td>
          </tr>
          <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
            <td className="flex-1 truncate w-[50%]">1500</td>
            <td className="min-w-fit w-[50%] text-right justify-end">
              05/07/2024
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CreditUsedHistoryTable;
