"use client";

import { Button } from "@/components/ui/button";
import { ChevronsLeft } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  useGetAmendsQuery,
  useUpdateAmendsMutation,
} from "@/redux/apis/jobsApi";
import ApiState from "@/components/ApiState";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const { data, isLoading, error, isSuccess, isFetching } = useGetAmendsQuery(
    params.id,
    {
      skip: !params.id, // Don't fetch until job ID is set
    }
  );
  console.log("🚀 ~ Page ~ data:", data);
  const [
    submit,
    {
      isLoading: isAmendsDataLoading,
      error: isAmendsDataError,
      isSuccess: isAmendsDataSuccess,
    },
  ] = useUpdateAmendsMutation();

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center mb-3">
        <div className="flex flex-col flex-1">
          <span className="flex items-center gap-1.5 mb-3">
            <ChevronsLeft className="w-[28px] h-[28px] text-[#DE3140]" />{" "}
            <span className="text-white text-[22px] font-normal leading-[26.4px]">
              Back
            </span>
          </span>
          <div className="flex flex-row justify-between">
            <h1 className="font-medium text-[32px] flex-1 leading-[130%] tracking-normal min-w-max text-white">
              Amends agreed
            </h1>
            <Button variant="outline" className="h-[42px] px-6">
              Required FAQs
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="w-full">
          <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex capitalize">
            requiring amends
          </span>
          <table className="w-full border-collapse text-white mb-8">
            <thead>
              <tr className="space-x-1 flex">
                <th className="py-3 px-4 w-[90px] justify-center min-w-[90px] items-center flex font-medium text-[14px] leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                  Number
                </th>
                <th className="py-3 px-4 flex-1 font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                  Description
                </th>
                <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                  Work Units
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 flex flex-col text-left justify-start !items-start">
                  <span className="mb-1.5 text-[#4A90E2]">
                    Engine Oil Change
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    egestas tempus ni elit. Sed egestas tempus nisi. Vestibulum
                    ultricies.
                  </span>
                </td>
                <td className="w-[107px] justify-center min-w-[107px] space-x-2">
                  2.5
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1">Front Bumper Repaint</td>
                <td className="w-[107px] justify-center min-w-[107px] space-x-2">
                  2.5
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 ">Front Bumper Repaint</td>
                <td className="w-[107px] justify-center min-w-[107px] space-x-2">
                  2.5
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 ">Front Bumper Repaint</td>
                <td className="w-[107px] justify-center min-w-[107px] space-x-2">
                  2.5
                </td>
              </tr>
            </tbody>
          </table>

          <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex capitalize">
            requiring checks
          </span>
          <table className="w-full border-collapse text-white mb-8">
            <thead>
              <tr className="space-x-1 flex">
                <th className="py-3 px-4 w-[90px] justify-center min-w-[90px] items-center flex font-medium text-[14px] leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                  Number
                </th>
                <th className="py-3 px-4 flex-1 font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                  Description
                </th>
                <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                  Work Units
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 flex flex-col text-left justify-start !items-start">
                  Front Bumper Repaint
                </td>
                <td className="w-[107px] justify-center min-w-[107px] space-x-2">
                  2.5
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1">Front Bumper Repaint</td>
                <td className="w-[107px] justify-center min-w-[107px] space-x-2">
                  2.5
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 ">Front Bumper Repaint</td>
                <td className="w-[107px] justify-center min-w-[107px] space-x-2">
                  2.5
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 ">Front Bumper Repaint</td>
                <td className="w-[107px] justify-center min-w-[107px] space-x-2">
                  2.5
                </td>
              </tr>
            </tbody>
          </table>

          <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex capitalize">
            general suggestions
          </span>
          <table className="w-full border-collapse text-white">
            <thead>
              <tr className="space-x-1 flex">
                <th className="py-3 px-4 w-[90px] justify-center min-w-[90px] items-center flex font-medium text-[14px] leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                  Number
                </th>
                <th className="py-3 px-4 flex-1 font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                  Description
                </th>
                <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                  Price ($)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 flex flex-col text-left justify-start !items-start">
                  Brake Pads Set (Front)
                </td>
                <td className="w-[107px] justify-center min-w-[107px] space-x-2">
                  2.5
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1">Front Bumper Repaint</td>
                <td className="w-[107px] justify-center min-w-[107px] space-x-2">
                  2.5
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 ">Front Bumper Repaint</td>
                <td className="w-[107px] justify-center min-w-[107px] space-x-2">
                  2.5
                </td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="w-[90px] justify-center min-w-[90px]">201</td>
                <td className="flex-1 ">Front Bumper Repaint</td>
                <td className="w-[107px] justify-center min-w-[107px] space-x-2">
                  2.5
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex items-center justify-end mt-8 w-full gap-6">
            <Input
              className=""
              placeholder="Please enter amended repair cost"
            />
            <Button variant={"default"}>
              <span className="text-[14px] font-medium leading-7">
                Complete Job
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
