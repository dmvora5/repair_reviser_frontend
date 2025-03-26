"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Download,
  Eye,
  Forward,
  PlusIcon,
  Reply,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePreviousJobsQuery } from "@/redux/apis/jobsApi";
import ApiState from "@/components/ApiState";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PAGE_SIZE } from "@/constant";

const STATUS: any = {
  not_reviewed: {
    text: "NOT REVIEWED",
    color: "!text-[#E2914A]",
  },
  reviewed: {
    text: "REVIEWED",
    color: "!text-[#4AE257]",
  },
};

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState<any>();

  const [state, setState] = useState<any>({
    page: 1,
    search: "",
    limit: PAGE_SIZE,
  });

  const { data, isLoading, error, isSuccess, isFetching } =
    usePreviousJobsQuery(state);

  console.log("isLoading", isLoading);
  console.log("isFetching", isFetching);

  console.log("data", data);

  const totalPages = Math.ceil((data?.count || 0) / state.limit);
  const currentPage = state.page;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setState((prev: any) => ({ ...prev, page: newPage }));
    }
  };

  const handleSearch = () => {
    setState((prev: any) => ({ ...prev, page: 1, search }));
  };

  const renderPaginationNumbers = () => {
    if (totalPages <= 1) return [];

    const maxPagesToShow = 5;
    const pageNumbers: (number | string)[] = [];

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) pageNumbers.push("...");
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pageNumbers.push(i);
      if (currentPage < totalPages - 2) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-col flex-1">
      <ApiState isSuccess={isSuccess} error={error}>
        <ApiState.Error />
      </ApiState>
      <div className="flex items-center mb-8">
        <div className="flex flex-col flex-1">
          <span className="font-medium text-[32px] leading-[130%] tracking-normal text-white mb-2">
            Previous Jobs
          </span>
          <span className="text-[#8F9DAC] text-[16px] leading-[130%] font-normal">
            View and manage past estimates.
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="w-full min-h-[50px] flex items-center gap-2 mb-4">
          <div className="bg-[#0C141C] border border-[#1B2231] h-[50px] rounded-[6px] flex items-center flex-1 px-4">
            <Search width={20} height={20} color="white" />
            <Input
              className="border-none text-xl no-focus placeholder:text-[#8F9DAC] text-white font-medium text-[14px] tracking-normal leading-5 pr-0"
              placeholder="Search here what you are looking for..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant={"default"} onClick={handleSearch}>
            <span className="text-[14px] font-medium leading-7">Filter</span>
          </Button>
          <Button variant={"default"} size="icon">
            <ArrowRight className="w-5 min-w-5" />
          </Button>
        </div>
        <div className="w-full">
          <table className="w-full border-collapse text-white">
            <thead>
              <tr className="space-x-1 flex">
                <th className="py-3 px-4 flex-1 font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                  Job Name
                </th>
                <th className="py-3 px-4 font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] min-w-[176px]">
                  Date Uploaded
                </th>
                <th className="py-3 px-4 font-medium text-[14px] min-w-[174px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                  Status
                </th>
                <th className="py-3 px-4 w-[92px] justify-center min-w-[92px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isFetching
                ? // Loading Skeleton Rows
                  [...Array(5)].map((_, index) => (
                    <tr
                      key={index}
                      className="flex space-x-1 animate-pulse *:px-4 *:border-b *:border-[#162332] *:min-h-[56px] *:h-[56px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal"
                    >
                      <td className="flex-1 truncate">
                        <div className="bg-gray-700 rounded-md h-6 w-32"></div>
                      </td>
                      <td className="min-w-[176px]">
                        <div className="bg-gray-700 rounded-md h-6 w-20"></div>
                      </td>
                      <td className="min-w-[176px]">
                        <div className="bg-gray-700 rounded-md h-6 w-24"></div>
                      </td>
                      <td className="w-[92px] justify-center min-w-[92px] flex items-center">
                        <div className="bg-gray-700 rounded-md h-6 w-6"></div>
                      </td>
                    </tr>
                  ))
                : (data?.results || []).map((ele: any) => (
                    <tr className="flex space-x-1 *:px-4 *:border-b *:border-[#162332] *:min-h-[56px] *:h-[56px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                      <td className="flex-1 truncate">
                        <Image
                          src="/pdfIcon.svg"
                          width={30}
                          height={30}
                          className="min-w-[30px] mr-3"
                          alt="pdf"
                        />
                        {ele?.job_name}
                      </td>
                      <td className="min-w-[176px]">
                        {new Date(ele?.created_at).toLocaleDateString()}
                      </td>
                      <td
                        className={cn(
                          "min-w-[176px] !font-semibold text-[14px]",
                          STATUS[ele?.status]?.color
                        )}
                      >
                        {STATUS[ele?.status]?.text}
                      </td>
                      <td className="w-[92px] justify-center min-w-[92px] gap-3 flex items-center">
                        <button className="text-[#4A90E2] hover:text-white">
                          <Download className="w-[20px]" />
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <Pagination className="flex justify-center items-center mt-4">
          {totalPages > 1 && (
            <PaginationContent className="flex space-x-2 bg-[#1E1E2E] p-3 rounded-lg shadow-md">
              {/* Previous Button */}
              <PaginationItem>
                <button
                  className={`px-4 py-2 rounded-md transition-all ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed bg-gray-700 text-gray-400"
                      : "bg-gray-800 hover:bg-gray-600 text-white"
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </PaginationItem>

              {/* Page Numbers */}
              {renderPaginationNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === "..." ? (
                    <PaginationEllipsis className="px-4 py-2 text-gray-400" />
                  ) : (
                    <button
                      className={`px-4 py-2 rounded-md font-semibold transition-all ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-gray-800 hover:bg-gray-600 text-gray-300"
                      }`}
                      onClick={() => handlePageChange(page as number)}
                    >
                      {page}
                    </button>
                  )}
                </PaginationItem>
              ))}

              {/* Next Button */}
              <PaginationItem>
                <button
                  className={`px-4 py-2 rounded-md transition-all ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed bg-gray-700 text-gray-400"
                      : "bg-gray-800 hover:bg-gray-600 text-white"
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </PaginationItem>
            </PaginationContent>
          )}
        </Pagination>
      </div>
    </div>
  );
};

export default page;
