"use client";

import { Button } from "@/components/ui/button";
import { ArrowBigUp, ArrowDown, ArrowUp, Edit, PlusIcon, Trash2, Undo2 } from "lucide-react";
import React, { useState } from "react";
import AddNewUserPopup from "./AddNewUserPopup";
import { PAGE_SIZE } from "@/constant";
import { useAllComponyUsersListQuery } from "@/redux/apis/userManagementApis";
import ApiState from "@/components/ApiState";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import UpdateUserPopup from "./UpdateUserPopup";
import DeleteUserPopUp from "./DeleteUserPopUp";
import SearchComponent from "@/components/SearchComponent";
import PageSizeSelector from "@/components/PageSizeSelector";
import { useRouter } from "next/navigation";
import { PAGE_ROUTES } from "@/constant/routes";
import Link from "next/link";

interface StateType {
  page: number;
  page_size: number;
  search?: any,
  ordering?: string
}

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, setState] = useState<StateType>({
    page: 1,
    page_size: PAGE_SIZE,
    search: "",
    ordering: "average_report_value"
  });

  console.log('state', state)

  const [editUser, setEditUser] = useState<any>({
    open: false,
    user: {}
  })

  const [deleteUser, setDeleteUser] = useState<any>({
    open: false,
    user: {},
  })


  const { data, isLoading, error, isSuccess, isFetching } = useAllComponyUsersListQuery(state);


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


  const editUserHadler = (user: any) => {
    setEditUser((ps: any) => ({
      ...ps,
      open: !ps.open,
      user
    }))
  }

  const deleteUserHadler = (user: any) => {
    setDeleteUser((ps: any) => ({
      ...ps,
      open: !ps.open,
      user
    }))
  }

  const handleSearch = (searchTerm: any) => {
    setState((prev: any) => ({ ...prev, page: 1, search: searchTerm }));
  };

  const redirectToAnalytics = (id: any) => {
    return `${PAGE_ROUTES.ANALYTICS}${id}`
  }


  const handleSorting = () => {
    setState((prev: any) => ({
      ...prev,
      ordering: prev.ordering === "average_report_value"
        ? "-average_report_value"
        : "average_report_value"
    }));
  }


  return (
    <div className="flex flex-col flex-1">
      <ApiState isSuccess={isSuccess} error={error}>
        <ApiState.Error />
        <ApiState.ArthorizeCheck />
      </ApiState>
      <div className="flex items-center mb-8">
        <div className="flex flex-col flex-1">
          <span className="font-medium text-[32px] leading-[130%] tracking-normal text-white mb-2">
            Create New User
          </span>
          <span className="text-[#8F9DAC] text-[16px] leading-[130%] font-normal">
            Create new user for your company.
          </span>
        </div>
        <Button variant={"default"} onClick={() => setIsModalOpen(true)}>
          <span className="text-[14px] font-medium leading-7">
            Add New User
          </span>
          <PlusIcon className="w-[24px]" />
        </Button>
      </div>
      <div className="flex flex-col">
        <div className="w-full min-h-[50px] flex items-center gap-2 mb-4">
          <div className="bg-[#0C141C] border border-[#1B2231] h-[50px] rounded-[6px] flex items-center flex-1 px-4">
            <SearchComponent searchState={handleSearch} />
          </div>
          {/* <Button variant={"default"} onClick={handleSearch}>
                    <span className="text-[14px] font-medium leading-7">Filter</span>
                  </Button>
                  <Button variant={"default"} size="icon">
                    <ArrowRight className="w-5 min-w-5" />
                  </Button> */}
        </div>
        <h3 className="text-white font-medium leading-[130%] text-[18px] tracking-normal mb-4 text-left">
          Users List
        </h3>
        <div className="w-full">
          <table className="w-full border-collapse text-white">
            <thead>
              <tr className="space-x-1 flex">
                <th className="py-3 px-4 w-[90px] justify-center min-w-[90px] items-center flex font-medium text-[14px] leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px]">
                  Id
                </th>
                <th className="py-3 px-4 flex-1 font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px]">
                  Customer Name
                </th>
                <th className="py-3 px-4 min-w-max font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] text-center">
                  <div className="flex justify-between">
                    <p> Report Cost</p>
                    <span className="cursor-pointer" onClick={handleSorting}>
                      {state?.ordering === "average_report_value" && <ArrowUp />}
                      {state?.ordering === "-average_report_value" && <ArrowDown />}
                    </span>
                  </div>
                </th>
                <th className="py-3 px-4 min-w-max font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px]">
                  Created On
                </th>
                <th className="py-3 px-4 w-[92px] justify-center min-w-[92px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                isFetching
                  ? [...Array(5)].map((_, index) => (
                    <tr
                      key={index}
                      className="flex space-x-1 animate-pulse *:px-4 *:border-b *:border-[#162332] *:min-h-[56px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal"
                    >
                      <td className="flex-1">
                        <div className="bg-gray-700 rounded-md h-6 w-32"></div>
                      </td>
                      <td className="min-w-[176px]">
                        <div className="bg-gray-700 rounded-md h-6 w-20"></div>
                      </td>
                      <td className="min-w-[176px] text-center">
                        <div className="bg-gray-700 rounded-md h-6 w-24 mx-auto"></div>
                      </td>
                      <td className="min-w-[176px]">
                        <div className="bg-gray-700 rounded-md h-6 w-24 mx-auto"></div>
                      </td>
                      <td className="w-[92px] justify-center min-w-[92px] flex items-center space-x-2">
                        <div className="bg-gray-700 rounded-md h-6 w-6"></div>
                      </td>
                    </tr>
                  )) :
                  (data?.results || []).map((ele: any) => (
                    <tr key={ele?.id} className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                      <td className="w-[90px] justify-center min-w-[90px]">{ele?.id}</td>
                      <td className="flex-1 cursor-pointer">
                        <Link href={redirectToAnalytics(ele?.id)}>
                          {ele?.username}
                        </Link>
                      </td>
                      <td className="min-w-[176px] justify-center">{ele?.average_report_value}</td>
                      <td className="min-w-fit">05/07/2024</td>
                      <td className="w-[92px] justify-center min-w-[92px] space-x-2">
                        <button onClick={deleteUserHadler.bind(null, ele)} className="text-[#DE3140] hover:text-red-400">
                          {ele?.is_active ? <Trash2 className="w-[20px]" /> : <Undo2 />}
                        </button>
                        <button onClick={editUserHadler.bind(null, ele)} className="text-[#62ee21] hover:text-green-400">
                          <Edit className="w-[20px]" />
                        </button>
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
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
                onChange={(newSize: any) => setState({ page: 1, page_size: newSize })}
              />
            </>
          )}
        </Pagination>
      </div>
      <AddNewUserPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <UpdateUserPopup
        isOpen={editUser.open}
        onClose={() => setEditUser((ps: any) => ({
          ...ps,
          open: false,
        }))}
        editUser={editUser.user}
      />
      <DeleteUserPopUp
        isOpen={deleteUser.open}
        onClose={() => setDeleteUser((ps: any) => ({
          ...ps,
          open: false
        }))}
        user={deleteUser.user}
      />
    </div>
  );
};

export default page;
