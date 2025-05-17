"use client";
import { useState } from "react";
import { useGetCreditsQuery } from "@/redux/apis/creditsApi";
import { PAGE_SIZE } from "@/constant";
import ApiState from "@/components/ApiState";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import PageSizeSelector from "@/components/PageSizeSelector";

const CreditUsedHistoryTable = () => {
  const [state, setState] = useState<any>({
    page: 1,
    page_size: PAGE_SIZE,
    search: "",
  });
  const { data, isLoading, error, isSuccess, isFetching } = useGetCreditsQuery(state);

  const totalPages = Math.ceil((data?.count || 0) / state.page_size);
  const currentPage = state.page;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
    <div className="w-full">
      <ApiState isSuccess={isSuccess} error={error}>
        <ApiState.Error />
        <ApiState.ArthorizeCheck />
      </ApiState>
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
          {isFetching ? (
            // Skeleton loading rows
            [...Array(5)].map((_, index) => (
              <tr
                key={index}
                className="flex space-x-1 animate-pulse *:px-4 *:border-b *:border-[#162332] *:min-h-[56px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal"
              >
                <td className="flex-1">
                  <div className="bg-gray-700 rounded-md h-6  w-20"></div>
                </td>
                <td className="min-w-[50%]">
                  <div className="bg-gray-700 rounded-md h-6 w-20 ml-auto"></div>
                </td>
              </tr>
            ))
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

export default CreditUsedHistoryTable;
