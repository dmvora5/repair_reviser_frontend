"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Upload } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone'
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
const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [type, setType] = useState<any>(null);

  const [submit, { isLoading, isSuccess, error }] = useUploadReportMutation()

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    if (acceptedFiles?.length) {
      if (!FILETYPES.includes(acceptedFiles[0].type)) {
        return errorToast("Invalid file type")
      }
      setFile(acceptedFiles[0])
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const clearFiles = () => {
    setFile(null)
  }


  const upload = async () => {

    if (!file || !type) {
      return errorToast("Please select a file and type")
    }

    const formData = new FormData();

    formData.append('file', file);
    formData.append('type', type);


    try {
      await submit(formData)
    } catch (error) {
      console.error(error)
    }


  }

  return (
    <div className="flex flex-col flex-1">
      <ApiState isSuccess={isSuccess} error={error}>
        <ApiState.SuccessMessage message="upload report sucessfully!" />
        <ApiState.Error />
      </ApiState>
      <div className="flex items-center mb-8">
        <div className="flex flex-col flex-1">
          <span className="font-medium text-[32px] leading-[130%] tracking-normal text-white mb-2">
            Upload New Job
          </span>
          <span className="text-[#8F9DAC] text-[16px] leading-[130%] font-normal">
            Upload your estimate for analytics
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col mb-4">
          <h3 className="text-white font-medium leading-[130%] text-[18px] tracking-normal text-left mb-1">
            Upload Estimate
          </h3>
          <span className="text-[#8F9DAC] text-[12px] leading-[130%] font-normal tracking-normal ">
            Insert your “Summary Reports” for analysis.
          </span>
        </div>
        <div className="w-full flex flex-col">
          {/**file */}
          {file && <div className="h-[78px] bg-[#0B1219] w-full mb-8  text-white ">
            <span>{file?.name}</span>
            <button onClick={clearFiles} className="w-2/5 text-white">X</button>
          </div>}
          {/**file upload div */}
          {!file &&
            <div className="flex flex-col items-center justify-center w-full h-[175px] border-[#1B2231] border rounded-xl bg-[#0B1219] text-white mb-8">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center cursor-pointer w-full h-full justify-center"
              >
                <span className="w-[48px] h-[48px] min-w-[48px] flex justify-center items-center bg-[#4A90E2] rounded-[6px]">
                  <Upload className="w-[20px] text-white" />
                </span>
                <p className="mt-4 flex items-center gap-[5px] mb-2">
                  <span className="text-[#DE3140] font-semibold text-[16px] leading-[130%] tracking-normal">
                    Choose a upload
                  </span>
                  <span className="text-[#8F9DAC] font-semibold text-[16px] leading-[130%] tracking-normal">
                    or drag & drop it here.
                  </span>
                </p>
                <span className="text-[#8F9DAC] m-0 font-normal text-[14px] leading-[130%] tracking-normal">
                  (PDF files upto 10 MB)
                </span>
                <Input {...getInputProps()} id="file-upload" type="file" className="h-full w-full" accept="application/pdf" />
              </label>
            </div>
          }
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="dropdown"
                  className="w-full text-left !border-[#1B2231] border !bg-[#0C141C] justify-start !text-[#8F9DAC] !text-[14px] !font-normal !leading-[130%] tracking-normal !rounded-[6px] !px-4 h-[50px]"
                >
                  <span className="flex-1">Select System</span>
                  <ChevronDown className="w-[20px] text-[#8F9DAC]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem onSelect={() => setType("audatex")}>Audatex</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setType("gt_motive")}>Gt motive</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setType("paint")}>Paint uplift</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Button onClick={upload} className="w-1/5 ml-auto my-8">Process estimate</Button>
      </div>
    </div>
  );
};

export default page;
