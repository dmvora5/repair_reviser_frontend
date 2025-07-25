"use client";

import { Button } from "@/components/ui/button";
import { ChevronsLeft } from "lucide-react";
import React, { useState } from "react";
import { useJobDetailsQuery } from "@/redux/apis/jobsApi";
import ApiState from "@/components/ApiState";
import { useParams, useRouter } from "next/navigation";
import { PAGE_ROUTES } from "@/constant/routes";

const Page = () => {
  const router = useRouter();
  const params = useParams();

  const {
    data: JobDetailsData,
    isLoading: isJobDetailsDataLoading,
    error: isJobDetailsDataError,
    isSuccess: isJobDetailsDataSuccess,
    isFetching: isJobDetailsDataFetching,
  } = useJobDetailsQuery(params.id, {
    skip: !params.id, // Don't fetch until job ID is set
  });

  const handleViewReport = () => {
    router.push(`${PAGE_ROUTES.JOBS.AMENDSREAD}${params?.id}`);
  };

  return (
    <div className="flex flex-col flex-1">
      <ApiState
        error={isJobDetailsDataError}
        isSuccess={isJobDetailsDataSuccess}
      >
        <ApiState.Error />
      </ApiState>
      <div className="flex items-center mb-3">
        <div className="flex flex-col flex-1">
          <span
            onClick={() => router.back()}
            className="flex items-center gap-1.5 mb-3 cursor-pointer"
          >
            <ChevronsLeft className="w-[28px] h-[28px] text-[#DE3140]" />{" "}
            <span className="text-white text-[22px] font-normal leading-[26.4px]">
              Back
            </span>
          </span>
          <h1 className="font-medium text-[32px] leading-[130%] tracking-normal text-white">
            Vehicle damage assessment report
          </h1>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row justify-between bg-[#0B1219] py-3 px-4 rounded-xl mb-6">
          <div className="flex flex-col">
            <h3 className="text-[#8F9DAC] font-normal leading-[130%] text-[16px] mb-1">
              Registration
            </h3>
            <div className="text-white text-[32px] leading-[130%] font-medium">
              {isJobDetailsDataLoading || isJobDetailsDataFetching ? (
                <div className="h-8 w-32 bg-[#1C1F26] rounded animate-pulse" />
              ) : (
                JobDetailsData?.registration_number
              )}
            </div>
          </div>
          <div className="flex flex-col justify-end text-end">
            <h3 className="text-[#8F9DAC] font-normal leading-[130%] text-[16px] mb-1">
              Repair Cost
            </h3>
            <div className="text-white text-[32px] leading-[130%] font-medium">
              {isJobDetailsDataLoading || isJobDetailsDataFetching ? (
                <div className="h-8 w-20 bg-[#1C1F26] rounded animate-pulse" />
              ) : JobDetailsData?.repaire_cost != null ? (
                `£${JobDetailsData.repaire_cost}`
              ) : (
                "£0"
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-[#0B1219] py-3 px-4 rounded-xl mb-6 gap-2">
          <div className="flex flec-row justify-between gap-1">
            <span className="text-[#8F9DAC] text-[16px] leading-[140%] font-normal">
              Assessment Number
            </span>
            <span className="text-white text-[16px] leading-[140%] font-medium">
              <span className="text-white text-[16px] leading-[140%] font-medium">
                {isJobDetailsDataLoading || isJobDetailsDataFetching ? (
                  <div className="h-4 w-24 bg-[#1C1F26] rounded animate-pulse" />
                ) : (
                  JobDetailsData?.assessment_number
                )}
              </span>
            </span>
          </div>
          <div className="flex flec-row justify-between gap-1 ">
            <span className="text-[#8F9DAC] text-[16px] leading-[140%] font-normal">
              Company Name
            </span>
            <span className="text-white text-[16px] leading-[140%] font-medium">
              <span className="text-white text-[16px] leading-[140%] font-medium">
                {isJobDetailsDataLoading || isJobDetailsDataFetching ? (
                  <div className="h-4 w-32 bg-[#1C1F26] rounded animate-pulse" />
                ) : (
                  JobDetailsData?.company_name
                )}
              </span>
            </span>
          </div>
          <div className="flex flec-row justify-between gap-1">
            <span className="text-[#8F9DAC] text-[16px] leading-[140%] font-normal">
              Date
            </span>
            <span className="text-white text-[16px] leading-[140%] font-medium">
              <span className="text-white text-[16px] leading-[140%] font-medium">
                {isJobDetailsDataLoading || isJobDetailsDataFetching ? (
                  <div className="h-4 w-24 bg-[#1C1F26] rounded animate-pulse" />
                ) : (
                  JobDetailsData?.printed_date
                )}
              </span>
            </span>
          </div>
        </div>

        <div className="w-full">
          <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex">
            EstimateFindings:
          </span>
          <table className="w-full border-collapse text-white mb-8">
            <thead>
              <tr className="space-x-1 flex">
                <th className="py-3 px-4 font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] w-[144px] min-w-[144px]">
                  Items
                </th>
                <th className="py-3 px-4 flex-1 font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                  Requirements
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex space-x-1 *:px-4 *:border-b *:border-[#162332] *:min-h-[56px] *:items-center *:flex  *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="truncate min-w-[144px] text-[#DE3140]">
                  {isJobDetailsDataLoading || isJobDetailsDataFetching ? (
                    <div className="h-4 w-16 bg-[#1C1F26] rounded animate-pulse" />
                  ) : (
                    `${JobDetailsData?.total_requiring_amends || 0} items`
                  )}
                </td>
                <td className="flex-1 text-[#DE3140]">Requiring Amends</td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[56px] *:items-center *:flex *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="min-w-[144px] truncate text-[#F3811C]">
                  {isJobDetailsDataLoading || isJobDetailsDataFetching ? (
                    <div className="h-4 w-16 bg-[#1C1F26] rounded animate-pulse" />
                  ) : (
                    `${JobDetailsData?.total_requiring_checks || 0} items`
                  )}
                </td>
                <td className="flex-1 text-[#F3811C]">Requiring Checks</td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[56px] *:items-center *:flex  *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="min-w-[144px] truncate text-[#7ED748]">
                  {isJobDetailsDataLoading || isJobDetailsDataFetching ? (
                    <div className="h-4 w-16 bg-[#1C1F26] rounded animate-pulse" />
                  ) : (
                    `${JobDetailsData?.total_general_suggestions || 0} items`
                  )}
                </td>
                <td className="flex-1 text-[#7ED748]">Genral Suggestions</td>
              </tr>
            </tbody>
          </table>
          <span className="text-[#8F9DAC] font-normal text-[16px] leading-[130%]">
            The system has extracted and categorized data into Labour, Paint,
            and Parts sections.
          </span>
          <div className="flex items-center justify-end mt-8 w-full">
            <Button variant={"default"} onClick={handleViewReport}>
              <span className="text-[14px] font-medium leading-7">
                View Report Findings
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
