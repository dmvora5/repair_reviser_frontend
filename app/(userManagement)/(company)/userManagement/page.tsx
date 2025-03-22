import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2 } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center mb-8">
        <div className="flex flex-col flex-1">
          <span className="font-medium text-[32px] leading-[130%] tracking-normal text-white mb-2">
            Create New User
          </span>
          <span className="text-[#8F9DAC] text-[16px] leading-[130%] font-normal">
            Create new user for your company.
          </span>
        </div>
        <Button variant={"default"}>
          <span className="text-[14px] font-medium leading-7">
            Add New User
          </span>
          <PlusIcon className="w-[20px]" />
        </Button>
      </div>
      <div className="flex flex-col">
        <h3 className="text-white font-medium leading-[130%] text-[18px] tracking-normal mb-4 text-left">
          Users List
        </h3>
        <div className="w-full max-w-4xl">
          <table className="w-full border-collapse text-white">
            <thead>
              <tr className="space-x-1 flex">
                <th className="py-3 px-4 w-[90px] justify-center min-w-[90px] items-center flex font-medium text-[14px] leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                  Number
                </th>
                <th className="py-3 px-4 flex-1 font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                  Customer Name
                </th>
                <th className="py-3 px-4 min-w-max font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                  Created On
                </th>
                <th className="py-3 px-4 w-[92px] justify-center min-w-[92px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 truncate">Johnson Smith</td>
                <td className="min-w-fit">05/07/2024</td>
                <td className="w-[92px] justify-center min-w-[92px]">
                  <button className="text-[#DE3140] hover:text-red-400">
                    <Trash2 className="w-[20px]" />
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
