"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useGetCreditsQuery } from "@/redux/apis/creditsApi";

const CreditUsedHistoryTable = () => {
  const [state, setState] = useState<any>({
    page: 1,
    search: "",
  });
  const { data, isLoading, error, isSuccess } = useGetCreditsQuery(state);

  console.log('data', data)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
          {isLoading ? (
            <tr className="flex">
              <td className="py-3 px-4 text-center text-[#8F9DAC]" colSpan={2}>
                Loading...
              </td>
            </tr>
          ) : (
            (data?.results || []).map((ele: any, index: number) => (
              <tr
                key={ele.created_at || index}
                className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal"
              >
                <td className="flex-1 w-[50%]">{ele.credit_amount}</td>
                <td className="min-w-fit w-[50%] text-right justify-end">
                  {formatDate(ele.created_at)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CreditUsedHistoryTable;
