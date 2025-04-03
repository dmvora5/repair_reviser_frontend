"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Upload, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { FILETYPES } from "@/constant";
import { errorToast } from "@/utils";
import { useUploadReportMutation } from "@/redux/apis/jobsApi";
import ApiState from "@/components/ApiState";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LoadingPopup from "../_component/LoadingPopup";

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
      <ApiState isSuccess={isSuccess} error={error}>
        <ApiState.SuccessMessage message="Upload report successfully!" />
        <ApiState.Error />
        <ApiState.ArthorizeCheck />
      </ApiState>
      <LoadingPopup isOpen={isLoading} />

      <div className="flex items-center mb-8">
        <div className="flex flex-col flex-1">
          <h1 className="font-medium text-[32px] leading-[130%] tracking-normal text-white mb-2">
            Upload New Job
          </h1>
          <p className="text-[#8F9DAC] text-[16px] leading-[130%] font-normal">
            Upload your estimate for analytics
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col mb-4">
          <h3 className="text-white font-medium leading-[130%] text-[18px] mb-1">Upload Estimate</h3>
          <p className="text-[#8F9DAC] text-[12px] leading-[130%]">
            Insert your “Summary Reports” for analysis.
          </p>
        </div>

        {/* File Upload Section */}
        {file ? (
          <div className="h-[78px] bg-[#0B1219] w-full mb-8 border border-[#242C3C] flex justify-between p-4 text-white rounded-xl">
            <div className="flex items-center">
              <Image src="/pdfIcon.svg" width={30} height={30} className="min-w-[30px] mr-3" alt="pdf" />
              <span className="text-[#8F9DAC] font-normal text-[14px] leading-[21px]">{file.name}</span>
            </div>
            <button onClick={clearFiles}>
              <X className="text-[#8F9DAC] w-[20px] hover:text-[#DE3140] cursor-pointer" />
            </button>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className="flex flex-col items-center justify-center w-full h-[175px] border-[#1B2231] border rounded-xl bg-[#0B1219] text-white mb-8 cursor-pointer"
          >
            <label htmlFor="file-upload" className="flex flex-col cursor-pointer items-center w-full h-full justify-center">
              <span className="w-[48px] h-[48px] flex justify-center items-center bg-[#4A90E2] rounded-[6px]">
                <Upload className="w-[20px] text-white" />
              </span>
              <p className="mt-4 flex items-center gap-[5px] mb-2">
                <span className="text-[#DE3140] font-semibold text-[16px]">Choose an upload</span>
                <span className="text-[#8F9DAC] font-semibold text-[16px]">or drag & drop it here.</span>
              </p>
              <span className="text-[#8F9DAC] text-[14px]">(PDF files up to 10 MB)</span>
              <Input
                onChange={(e) => {
                  if (e.target.files) {
                    onDrop(Array.from(e.target.files)); // Handle selected files
                  }
                }}
                id="file-upload" type="file" className="hidden" accept="application/pdf" />
            </label>
          </div>
        )}

        {/* System Selection Dropdown */}
        <Select onValueChange={setType}>
          <SelectTrigger className="w-full text-left !border-[#1B2231] border !bg-[#0C141C] justify-between !text-[#8F9DAC] text-[14px] font-normal !leading-[130%] tracking-normal !rounded-[6px] !px-4 h-[50px] flex">
            <SelectValue placeholder="Select System" />
          </SelectTrigger>
          <SelectContent className="w-full text-left !border-[#1B2231] border !bg-[#0C141C]  justify-between !text-[#8F9DAC] text-[14px] font-normal !leading-[130%]">
            <SelectItem value="audatex" className="hover:!text-[#DE3140] hover:!bg-transparent !text-[#8F9DAC] !text-[14px] font-normal cursor-pointer active:bg-transparent active:text-[#DE3140]">Audatex</SelectItem>
            <SelectItem value="gt_motive">Gt Motive</SelectItem>
            <SelectItem value="paint">Paint Uplift</SelectItem>
          </SelectContent>
        </Select>

        {/* Upload Button */}
        <Button onClick={upload} className="w-1/5 ml-auto my-8">
          Process Estimate
        </Button>
      </div>
    </div>
  );
};

export default Page;
