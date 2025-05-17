"use client";
import { useState } from "react";
import { useUsedCreditsQuery } from "@/redux/apis/creditsApi"; // adjust the import path as needed
import { PAGE_SIZE } from "@/constant";
import ApiState from "@/components/ApiState";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import PageSizeSelector from "@/components/PageSizeSelector";

const CreditUsedHistory = () => {
  const [state, setState] = useState<any>({
    page: 1,
    page_size: PAGE_SIZE,
    search: "",
  });

  const { data, isLoading, isFetching, error, isSuccess } = useUsedCreditsQuery(state);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const totalPages = Math.ceil((data?.count || 0) / state.page_size);
  const currentPage = state.page;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setState((prev: any) => ({ ...prev, page: newPage }));
    }
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
    <div className="w-full flex flex-col">
      <ApiState isSuccess={isSuccess} error={error}>
        <ApiState.Error />
        <ApiState.ArthorizeCheck />
      </ApiState>
      <span className="text-white font-semibold text-[14px] leading-[130%] mb-2">
        History
      </span>
      <div className="flex flex-col w-full">
        {isFetching
          ? // Skeleton loading rows (5 placeholders)
          [...Array(5)].map((_, index) => (
            <div
              key={index}
              className="border-b border-[#162332] py-4 flex flex-col animate-pulse"
            >
              <div className="bg-gray-700 rounded-md h-6 w-[120px] mb-2"></div>
              <div className="bg-gray-700 rounded-md h-4 w-[200px]"></div>
            </div>
          ))
          : (data?.results || []).map((item: any, index: number) => (
            <div
              key={item.created_at || index}
              className="border-b border-[#162332] py-4 flex flex-col"
            >
              <span className="text-[#4A90E2] font-medium text-[16px] tracking-normal leading-[24px] mb-1.5">
                {item.used_credit} Credits
              </span>
              <span className="text-[#8F9DAC] font-normal text-[14px] leading-[130%] tracking-normal">
                {item.username} used credit on {formatDate(item.created_at)}
              </span>
            </div>
          ))}
      </div>

      <Pagination className="flex justify-center items-center mt-4">
        {totalPages > 1 && (
          <>
            <PaginationContent className="flex space-x-2 bg-[#1E1E2E] p-3 rounded-lg shadow-md">
              {/* Previous Button */}
              <PaginationItem>
                <button
                  className={`px-4 py-2 rounded-md transition-all ${currentPage === 1
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
                      className={`px-4 py-2 rounded-md font-semibold transition-all ${currentPage === page
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
                  className={`px-4 py-2 rounded-md transition-all ${currentPage === totalPages
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
            <PageSizeSelector
              value={state.page_size}
              onChange={(newSize) => setState({ page: 1, page_size: newSize })}
            />
          </>
        )}
      </Pagination>
    </div>
  );
};

export default CreditUsedHistory;
