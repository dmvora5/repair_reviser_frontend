"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { PAGE_ROUTES } from "@/constant/routes";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const SubDataUI = ({
  // data,
  // expandedRowId,
  // toggleRow,
  // handleAgreeToggle,
  // repaireCost,
  // setRepaireCost,
  // handleSave,
  // handleUpdate,
  // isAmendsDataLoading,
  // isBulkAmendsDataLoading,
  // isUpdateRepaireCostLoading,
  data,
  expandedRowId,
  toggleRow, // This should match the prop name you passed (toggleRow)
  handleAgreeToggle,
  repaireCost,
  setRepaireCost,
  handleSave,
  handleUpdate,
  isAmendsDataLoading,
  isBulkAmendsDataLoading,
  isUpdateRepaireCostLoading,
  isGeneralDataLoading,
}: any) => {
  // const getKey = (item: any) =>
  //   `${item?.subs_description}-${item?.requirement_type}`;
  // In SubDataUI.tsx
  const getKey = (item: any) =>
    `${item?.subs_description || item?.description}-${item?.requirement_type}-${item?.number}`;

  return (
    <div className="flex flex-col">
      {/* Labour Category */}
      <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex capitalize">
        Labour Category
      </span>
      {data?.labour?.length > 0 && (
        <table className="w-full border-collapse text-white mb-8">
          <thead>
            <tr className="space-x-1 flex">
              <th className="py-3 px-4 flex-1 font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                Description
              </th>
              <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                Type
              </th>
              <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                Items
              </th>
              <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                View Details
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.labour?.map((labourItem: any, index: number) => (
              <React.Fragment key={index}>
                <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                  <td className="flex-1 flex flex-col text-left justify-start !items-start">
                    <span className="mb-1.5 text-[#4A90E2]">
                      {labourItem.subs_description}
                    </span>
                  </td>

                  <td className="w-[107px] justify-center min-w-[107px] space-x-2 text-center">
                    <span
                      style={{
                        color:
                          labourItem.requirement_type === "requiring_checks"
                            ? "#F3811C"
                            : labourItem.requirement_type === "requiring_amend"
                            ? "#DE3140"
                            : labourItem.requirement_type ===
                              "general_suggestions"
                            ? "#7ED748"
                            : "inherit",
                      }}
                    >
                      {labourItem.requirement_type
                        ? labourItem.requirement_type
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (c: any) => c.toUpperCase())
                        : "-"}
                    </span>
                  </td>

                  <td className="w-[107px] justify-center min-w-[107px] space-x-2 text-center">
                    {labourItem.subs?.length || 0}
                  </td>

                  <td className="w-[107px] justify-center min-w-[107px] space-x-2 text-center cursor-pointer">
                    <button onClick={() => toggleRow(labourItem)}>
                      {expandedRowId === getKey(labourItem) ? (
                        <ChevronUp className="w-4 h-4 text-white" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </td>
                </tr>

                {/* Subs */}
                {expandedRowId === getKey(labourItem) &&
                  labourItem.subs?.length > 0 && (
                    <tr className="w-full">
                      <td colSpan={4}>
                        <div className="bg-[#1B2738] rounded-md p-4 ml-4">
                          <table className="w-full table-auto">
                            <thead>
                              <tr className="space-x-1 flex">
                                <th className="py-2 px-4 w-[90px] justify-center min-w-[90px] items-center flex font-medium text-[13px] leading-[130%] tracking-normal text-white">
                                  Number
                                </th>
                                <th className="py-2 px-4 flex-1 font-medium text-[13px] items-center flex leading-[130%] tracking-normal text-white">
                                  Description
                                </th>
                                <th className="py-2 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[13px] items-center flex leading-[130%] tracking-normal text-white text-center">
                                  {labourItem.subs[0].work_units !== null
                                    ? "Work Units"
                                    : "Price"}
                                </th>
                                <th className="py-2 px-4 w-[90px] justify-center min-w-[90px] items-center flex font-medium text-[13px] leading-[130%] tracking-normal text-white">
                                  Agree
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {labourItem.subs.map(
                                (sub: any, subIndex: number) => (
                                  <tr
                                    key={subIndex}
                                    className="text-[13px] text-white border-b border-[#2A3A4D] flex space-x-1"
                                  >
                                    <td className="py-2 px-4 w-[90px] justify-center min-w-[90px]">
                                      {sub.number || "-"}
                                    </td>
                                    <td className="py-2 px-4 flex-1">
                                      {sub.description ?? "-"}
                                    </td>
                                    <td className="py-2 px-4 w-[107px] justify-center min-w-[107px] text-center">
                                      {sub.work_units !== null
                                        ? sub.work_units
                                        : sub.price
                                        ? `£${sub.price}`
                                        : "-"}
                                    </td>
                                    <td className="py-2 px-4 w-[90px] justify-center min-w-[90px] text-center">
                                      <input
                                        type="checkbox"
                                        checked={sub.agree}
                                        onChange={(e) =>
                                          handleAgreeToggle(
                                            e,
                                            sub,
                                            "labour",
                                            index,
                                            subIndex
                                          )
                                        }
                                        className="accent-blue-500 w-4 h-4 cursor-pointer"
                                      />
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

      {/* Paint Category */}
      <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex capitalize">
        Paint Category
      </span>
      {data?.paint?.length > 0 && (
        <table className="w-full border-collapse text-white mb-8">
          <thead>
            <tr className="space-x-1 flex">
              <th className="py-3 px-4 flex-1 font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                Description
              </th>
              <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                Type
              </th>
              <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                Items
              </th>
              <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                View Details
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.paint?.map((paintItem: any, index: number) => (
              <React.Fragment key={index}>
                <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                  <td className="flex-1 flex flex-col text-left justify-start !items-start">
                    <span className="mb-1.5 text-[#4A90E2]">
                      {paintItem.subs_description}
                    </span>
                  </td>

                  <td className="w-[107px] justify-center min-w-[107px] space-x-2 text-center">
                    <span
                      style={{
                        color:
                          paintItem.requirement_type === "requiring_checks"
                            ? "#F3811C"
                            : paintItem.requirement_type === "requiring_amend"
                            ? "#DE3140"
                            : paintItem.requirement_type ===
                              "general_suggestions"
                            ? "#7ED748"
                            : "inherit",
                      }}
                    >
                      {paintItem.requirement_type
                        ? paintItem.requirement_type
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (c: any) => c.toUpperCase())
                        : "-"}
                    </span>
                  </td>

                  <td className="w-[107px] justify-center min-w-[107px] space-x-2 text-center">
                    {paintItem.subs?.length || 0}
                  </td>

                  <td className="w-[107px] justify-center min-w-[107px] space-x-2 text-center cursor-pointer">
                    <button onClick={() => toggleRow(paintItem)}>
                      {expandedRowId === getKey(paintItem) ? (
                        <ChevronUp className="w-4 h-4 text-white" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </td>
                </tr>

                {/* Subs */}
                {expandedRowId === getKey(paintItem) &&
                  paintItem.subs?.length > 0 && (
                    <tr className="w-full">
                      <td colSpan={4}>
                        <div className="bg-[#1B2738] rounded-md p-4 ml-4">
                          <table className="w-full table-auto">
                            <thead>
                              <tr className="space-x-1 flex">
                                <th className="py-2 px-4 w-[90px] justify-center min-w-[90px] items-center flex font-medium text-[13px] leading-[130%] tracking-normal text-white">
                                  Number
                                </th>
                                <th className="py-2 px-4 flex-1 font-medium text-[13px] items-center flex leading-[130%] tracking-normal text-white">
                                  Description
                                </th>
                                <th className="py-2 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[13px] items-center flex leading-[130%] tracking-normal text-white text-center">
                                  {paintItem.subs[0].work_units !== null
                                    ? "Work Units"
                                    : "Price"}
                                </th>
                                <th className="py-2 px-4 w-[90px] justify-center min-w-[90px] items-center flex font-medium text-[13px] leading-[130%] tracking-normal text-white">
                                  Agree
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {paintItem.subs.map(
                                (sub: any, subIndex: number) => (
                                  <tr
                                    key={subIndex}
                                    className="text-[13px] text-white border-b border-[#2A3A4D] flex space-x-1"
                                  >
                                    <td className="py-2 px-4 w-[90px] justify-center min-w-[90px]">
                                      {sub.number || "-"}
                                    </td>
                                    <td className="py-2 px-4 flex-1">
                                      {sub.description ?? "-"}
                                    </td>
                                    <td className="py-2 px-4 w-[107px] justify-center min-w-[107px] text-center">
                                      {sub.work_units !== null
                                        ? sub.work_units
                                        : sub.price
                                        ? `£${sub.price}`
                                        : "-"}
                                    </td>
                                    <td className="py-2 px-4 w-[90px] justify-center min-w-[90px] text-center">
                                      <input
                                        type="checkbox"
                                        checked={sub.agree}
                                        onChange={(e) =>
                                          handleAgreeToggle(
                                            e,
                                            sub,
                                            "paint",
                                            index,
                                            subIndex
                                          )
                                        }
                                        className="accent-blue-500 w-4 h-4 cursor-pointer"
                                      />
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

      {/* Part Category */}
      <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex capitalize">
        Part Category
      </span>
      {data?.part?.length > 0 && (
        <table className="w-full border-collapse text-white mb-8">
          <thead>
            <tr className="space-x-1 flex">
              <th className="py-3 px-4 flex-1 font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                Description
              </th>
              <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                Type
              </th>
              <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                Items
              </th>
              <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                View Details
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.part?.map((partItem: any, index: number) => (
              <React.Fragment key={index}>
                <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                  <td className="flex-1 flex flex-col text-left justify-start !items-start">
                    <span className="mb-1.5 text-[#4A90E2]">
                      {partItem.subs_description}
                    </span>
                  </td>

                  <td className="w-[107px] justify-center min-w-[107px] space-x-2 text-center">
                    <span
                      style={{
                        color:
                          partItem.requirement_type === "requiring_checks"
                            ? "#F3811C"
                            : partItem.requirement_type === "requiring_amend"
                            ? "#DE3140"
                            : partItem.requirement_type ===
                              "general_suggestions"
                            ? "#7ED748"
                            : "inherit",
                      }}
                    >
                      {partItem.requirement_type
                        ? partItem.requirement_type
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (c: any) => c.toUpperCase())
                        : "-"}
                    </span>
                  </td>

                  <td className="w-[107px] justify-center min-w-[107px] space-x-2 text-center">
                    {partItem.subs?.length || 0}
                  </td>

                  <td className="w-[107px] justify-center min-w-[107px] space-x-2 text-center cursor-pointer">
                    <button onClick={() => toggleRow(partItem)}>
                      {expandedRowId === getKey(partItem) ? (
                        <ChevronUp className="w-4 h-4 text-white" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </td>
                </tr>

                {/* Subs */}
                {expandedRowId === getKey(partItem) &&
                  partItem.subs?.length > 0 && (
                    <tr className="w-full">
                      <td colSpan={4}>
                        <div className="bg-[#1B2738] rounded-md p-4 ml-4">
                          <table className="w-full table-auto">
                            <thead>
                              <tr className="space-x-1 flex">
                                <th className="py-2 px-4 w-[90px] justify-center min-w-[90px] items-center flex font-medium text-[13px] leading-[130%] tracking-normal text-white">
                                  Number
                                </th>
                                <th className="py-2 px-4 flex-1 font-medium text-[13px] items-center flex leading-[130%] tracking-normal text-white">
                                  Description
                                </th>
                                <th className="py-2 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[13px] items-center flex leading-[130%] tracking-normal text-white text-center">
                                  {partItem.subs[0].work_units !== null
                                    ? "Work Units"
                                    : "Price"}
                                </th>
                                <th className="py-2 px-4 w-[90px] justify-center min-w-[90px] items-center flex font-medium text-[13px] leading-[130%] tracking-normal text-white">
                                  Agree
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {partItem.subs.map(
                                (sub: any, subIndex: number) => (
                                  <tr
                                    key={subIndex}
                                    className="text-[13px] text-white border-b border-[#2A3A4D] flex space-x-1"
                                  >
                                    <td className="py-2 px-4 w-[90px] justify-center min-w-[90px]">
                                      {sub.number || "-"}
                                    </td>
                                    <td className="py-2 px-4 flex-1">
                                      {sub.description ?? "-"}
                                    </td>
                                    <td className="py-2 px-4 w-[107px] justify-center min-w-[107px] text-center">
                                      {sub.work_units !== null
                                        ? sub.work_units
                                        : sub.price
                                        ? `£${sub.price}`
                                        : "-"}
                                    </td>
                                    <td className="py-2 px-4 w-[90px] justify-center min-w-[90px] text-center">
                                      <input
                                        type="checkbox"
                                        checked={sub.agree}
                                        onChange={(e) =>
                                          handleAgreeToggle(
                                            e,
                                            sub,
                                            "part",
                                            index,
                                            subIndex
                                          )
                                        }
                                        className="accent-blue-500 w-4 h-4 cursor-pointer"
                                      />
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

      {/* General Suggestions */}
      {data?.general_suggestions?.length > 0 && (
        <>
          <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex capitalize">
            General Suggestions
          </span>
          <table className="w-full border-collapse text-white mb-8">
            <thead>
              <tr className="space-x-1 flex">
                <th className="py-3 px-4 flex-1 font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                  Suggestions
                </th>
                <th className="py-3 px-4 w-[90px] justify-center min-w-[90px] items-center flex font-medium text-[14px] leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px]">
                  Agree
                </th>
              </tr>
            </thead>
            <tbody>
              {data.general_suggestions.map(
                (
                  suggestion: {
                    id: number;
                    suggestion: string;
                    agree: boolean;
                  },
                  index: number
                ) => (
                  <tr
                    key={suggestion.id}
                    className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal"
                  >
                    <td className="flex-1 text-left !items-start">
                      {suggestion.suggestion}
                    </td>
                    <td className="w-[90px] justify-center min-w-[90px] text-center">
                      <input
                        type="checkbox"
                        checked={suggestion.agree}
                        onChange={(e) =>
                          handleAgreeToggle(
                            e,
                            suggestion,
                            "general_suggestions",
                            index,
                            0
                          )
                        }
                        className="accent-blue-500 w-4 h-4 cursor-pointer"
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </>
      )}

      <div className="flex items-center justify-end mt-8 w-full gap-6">
        {/* Repair Cost Input */}
        <Input
          type="number"
          value={repaireCost}
          onChange={(e) => setRepaireCost(e.target.value)}
          placeholder="Please enter amended repair cost"
          className="rounded-md border border-[#334155] bg-[#0B121B] text-white text-sm placeholder:text-[#8F9DAC]"
        />

        {/* Confirm Amends Button */}
        <Button
          onClick={handleUpdate}
          disabled={isUpdateRepaireCostLoading}
          className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors min-w-[160px] ${
            isUpdateRepaireCostLoading
              ? "border-[#334155] bg-[#1E293B] text-white"
              : "border-[#334155] text-white hover:border-red-500 hover:text-red-500"
          }`}
        >
          {isUpdateRepaireCostLoading ? (
            <>
              <Image
                src="/images/loader.svg"
                alt="loader"
                width={20}
                height={20}
                className="mr-2 animate-spin"
              />
              Loading...
            </>
          ) : (
            "Confirm amends"
          )}
        </Button>

        {/* Update Agree Amends Button */}
        <Button
          onClick={handleSave}
          disabled={isBulkAmendsDataLoading}
          className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors min-w-[180px] ${
            isBulkAmendsDataLoading
              ? "border-[#334155] bg-[#1E293B] text-white"
              : "border-[#334155] text-white hover:border-red-500 hover:text-red-500"
          }`}
        >
          {isBulkAmendsDataLoading ? (
            <>
              <Image
                src="/images/loader.svg"
                alt="loader"
                width={20}
                height={20}
                className="mr-2 animate-spin"
              />
              Loading...
            </>
          ) : (
            "Update Agree Amends"
          )}
        </Button>
      </div>
    </div>
  );
};

export default SubDataUI;
