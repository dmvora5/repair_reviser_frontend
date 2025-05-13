"use client";

import { Button } from "@/components/ui/button";
import {
  Backpack,
  ChevronDown,
  ChevronsLeft,
  Eye,
  Forward,
  Upload,
  X,
} from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { FILETYPES } from "@/constant";
import { errorToast } from "@/utils";
import {
  useJobDetailsQuery,
  useUploadReportMutation,
} from "@/redux/apis/jobsApi";
import ApiState from "@/components/ApiState";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [submit, { isLoading, isSuccess, error }] = useUploadReportMutation();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      if (!FILETYPES.includes(acceptedFiles[0].type)) {
        return errorToast("Invalid file type");
      }
      setFile(acceptedFiles[0]);
    }
  }, []);

  const {
    data: JobDetailsData,
    isLoading: isJobDetailsDataLoading,
    error: isJobDetailsDataError,
    isSuccess: isJobDetailsDataSuccess,
    isFetching: isJobDetailsDataFetching,
  } = useJobDetailsQuery(params.id, {
    skip: !params.id, // Don't fetch until job ID is set
  });
  console.log("🚀 ~ page ~ JobDetailsData:", JobDetailsData);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const clearFiles = () => setFile(null);

  const upload = async () => {
    if (!file || !type) {
      return errorToast("Please select a file and type");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      await submit(formData);
    } catch (error) {
      console.error(error);
    }
  };

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
            <p className="text-white text-[32px] leading-[130%] font-medium">
              {JobDetailsData?.registration_number}
            </p>
          </div>
          <div className="flex flex-col justify-end text-end">
            <h3 className="text-[#8F9DAC] font-normal leading-[130%] text-[16px] mb-1">
              Repair Cost
            </h3>
            <p className="text-white text-[32px] leading-[130%] font-medium">
              £5176.29
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-[#0B1219] py-3 px-4 rounded-xl mb-6 gap-2">
          <div className="flex flec-row justify-between gap-1">
            <span className="text-[#8F9DAC] text-[16px] leading-[140%] font-normal">
              Assessment Number
            </span>
            <span className="text-white text-[16px] leading-[140%] font-medium">
              ZC000373
            </span>
          </div>
          <div className="flex flec-row justify-between gap-1 ">
            <span className="text-[#8F9DAC] text-[16px] leading-[140%] font-normal">
              Company Name
            </span>
            <span className="text-white text-[16px] leading-[140%] font-medium">
              {JobDetailsData?.company_name}
            </span>
          </div>
          <div className="flex flec-row justify-between gap-1">
            <span className="text-[#8F9DAC] text-[16px] leading-[140%] font-normal">
              Date
            </span>
            <span className="text-white text-[16px] leading-[140%] font-medium">
              {JobDetailsData?.printed_date}
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
                  3 items
                </td>
                <td className="flex-1 text-[#DE3140]">requiring amends.</td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[56px] *:items-center *:flex *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="min-w-[144px] truncate text-[#F3811C]">
                  5 items
                </td>
                <td className="flex-1 text-[#F3811C]">requiring checks.</td>
              </tr>
              <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[56px] *:items-center *:flex  *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                <td className="min-w-[144px] truncate text-[#7ED748]">
                  4 items
                </td>
                <td className="flex-1 text-[#7ED748]">general suggestions.</td>
              </tr>
            </tbody>
          </table>
          <span className="text-[#8F9DAC] font-normal text-[16px] leading-[130%]">
            The system has extracted and categorized data into Labour, Paint,
            and Parts sections.
          </span>
          <div className="flex items-center justify-end mt-8 w-full">
            <Button variant={"default"}>
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
