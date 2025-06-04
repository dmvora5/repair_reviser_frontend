"use client";

import { Button } from "@/components/ui/button";
import { Backpack, ChevronDown, ChevronsLeft, Edit, Eye, Forward, Trash2, Upload, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { FILETYPES } from "@/constant";
import { errorToast } from "@/utils";
import { useUploadReportMutation } from "@/redux/apis/jobsApi";
import ApiState from "@/components/ApiState";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Page = () => {
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
            <ChevronsLeft className="w-[28px] h-[28px] text-[#DE3140]" />   <span className="text-white text-[22px] font-normal leading-[26.4px]">Back</span>
          </span>
          <div className="flex flex-row justify-between">
            <h1 className="font-medium text-[32px] flex-1 leading-[130%] tracking-normal min-w-max text-white">
            Agreeing amends
            </h1>
            <Button
              variant="outline"
              className="h-[42px] px-6">
                Required FAQs
              </Button>
            </div>
        </div>
      </div>

      <div className="flex flex-col">
         <div className="w-full">
            <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex capitalize">requiring amends</span>
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
                  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas tempus ni
                  elit. Sed egestas tempus nisi. Vestibulum ultricies.</span></td>
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

          <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex capitalize">requiring checks</span>
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
                  Front Bumper Repaint</td>
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

          <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex capitalize">general suggestions</span>
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
                  Brake Pads Set (Front)</td>
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
