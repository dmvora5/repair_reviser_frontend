'use client'
import ProcessLoader from '@/components/ProcessLoader';
import { Button } from '@/components/ui/button';
import { PAGE_ROUTES } from '@/constant/routes';
import { useViewAmendsQuery } from '@/redux/apis/jobsApi';
import { ChevronDown, ChevronsLeft, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const page = () => {

  const router = useRouter();
  const params = useParams();

  const [expandedRowId, setExpandedRowId] = useState<any>(null);


  const { data, isLoading, error, isSuccess, isFetching } = useViewAmendsQuery(
    params.id,
    {
      skip: !params.id, // Don't fetch until job ID is set
    }
  );

  const getKey = (item: any) => `${item?.description}-${item?.number}`

  const toggleRow = (item: any) => {
    const key = getKey(item);
    setExpandedRowId((prev: any) => (prev === key ? null : key));
  };


  return (
    <div className="relative flex flex-col flex-1">

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
          <div className="flex flex-row gap-2 justify-between">
            <h1 className="font-medium text-[32px] flex-1 leading-[130%] tracking-normal min-w-max text-white">
              Agreeing amends
            </h1>
            {/* <Button variant="outline" className="h-[42px] px-6">
              <Link href={PAGE_ROUTES.FAQ}>
                Required FAQs
              </Link>
            </Button> */}

          </div>
        </div>
      </div>

      {(isLoading || isFetching) ? (
        <div className="text-white flex justify-center items-center h-[80vh]">
          <ProcessLoader />
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="w-full">
            <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex capitalize">
              Labour Category
            </span>
            {data?.labour?.length > 0 && (
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
                      Amends
                    </th>
                    <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                      Work Units
                    </th>
                    <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                      View Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.labour?.map((labourItem: any, index: number) => (
                    <React.Fragment key={index}>
                      {/* Main Row */}
                      <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                        <td className="w-[90px] justify-center min-w-[90px]">
                          {labourItem.number || "-"}
                        </td>

                        <td className="flex-1 flex flex-col text-left justify-start !items-start">
                          <span className="mb-1.5 text-[#4A90E2]">
                            {labourItem.description}
                          </span>
                        </td>

                        <td className="w-[107px] justify-center min-w-[107px] space-x-2 text-center">
                          {labourItem.subs?.length || 0}
                        </td>

                        <td className="w-[107px] justify-center min-w-[107px] space-x-2 text-center">
                          {labourItem.work_units ?? "-"}
                        </td>

                        {/* Accordion Icon */}
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

                      {/* Sub row for subs (Amends) */}
                      {expandedRowId === getKey(labourItem) &&
                        labourItem.subs?.length > 0 && (
                          <tr className="w-full">
                            <td colSpan={5}>
                              <div className="bg-[#1B2738] rounded-md p-4 ml-4">
                                <table className="w-full table-auto">
                                  <tbody>
                                    {labourItem.subs.map(
                                      (sub: any, subIndex: number) => (
                                        <tr
                                          key={subIndex}
                                          className="text-[13px] text-white border-b border-[#2A3A4D]"
                                        >
                                          <td className="py-2">
                                            <span
                                              style={{
                                                color:
                                                  sub.requirement_type ===
                                                    "requiring_checks"
                                                    ? "#F3811C"
                                                    : sub.requirement_type ===
                                                      "requiring_amend"
                                                      ? "#DE3140"
                                                      : sub.requirement_type ===
                                                        "general_suggestions"
                                                        ? "#7ED748"
                                                        : "inherit",
                                              }}
                                            >
                                              {sub.requirement_type
                                                ? sub.requirement_type
                                                  .replace(/_/g, " ")
                                                  .replace(
                                                    /\b\w/g,
                                                    (c: any) =>
                                                      c.toUpperCase()
                                                  )
                                                : "-"}
                                            </span>
                                          </td>
                                          <td className="py-2">
                                            {sub.subs_description ?? "-"}
                                          </td>
                                          <td className="py-2 cursor-pointer">
                                            <Link href={PAGE_ROUTES.FAQ}>
                                              Click for FAQ
                                            </Link>
                                          </td>

                                          {/* Checkbox Cell */}
                                          {/* {data?.status !== JOBSTATUS.COMPLETED && */}
                                      
                                          {/* } */}
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

            <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex capitalize">
              Paint Category
            </span>
            {data?.paint?.length > 0 && (
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
                      Amends
                    </th>
                    <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                      Work Units
                    </th>
                    <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                      View Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.paint?.map((paintItem: any, index: number) => (
                    <React.Fragment key={index}>
                      {/* Main Row */}
                      <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                        <td className="w-[90px] justify-center min-w-[90px]">
                          {paintItem.number || "-"}
                        </td>

                        <td className="flex-1 flex flex-col text-left justify-start !items-start">
                          <span className="mb-1.5 text-[#4A90E2]">
                            {paintItem.description}
                          </span>
                        </td>

                        <td className="w-[107px] justify-center min-w-[107px] space-x-2 text-center">
                          {paintItem.subs?.length || 0}
                        </td>

                        <td className="w-[107px] justify-center min-w-[107px] space-x-2 text-center">
                          {paintItem.work_units ?? "-"}
                        </td>

                        {/* Accordion Icon */}
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

                      {/* Sub row for subs (Amends) */}
                      {expandedRowId === getKey(paintItem) &&
                        paintItem.subs?.length > 0 && (
                          <tr className="w-full">
                            <td colSpan={5}>
                              <div className="bg-[#1B2738] rounded-md p-4 ml-4">
                                <table className="w-full table-auto">
                                  <tbody>
                                    {paintItem.subs.map(
                                      (sub: any, subIndex: number) => (
                                        <tr
                                          key={subIndex}
                                          className="text-[13px] text-white border-b border-[#2A3A4D]"
                                        >
                                          <td className="py-2">
                                            <span
                                              style={{
                                                color:
                                                  sub.requirement_type ===
                                                    "requiring_checks"
                                                    ? "#F3811C"
                                                    : sub.requirement_type ===
                                                      "requiring_amend"
                                                      ? "#DE3140"
                                                      : sub.requirement_type ===
                                                        "general_suggestions"
                                                        ? "#7ED748"
                                                        : "inherit",
                                              }}
                                            >
                                              {sub.requirement_type
                                                ? sub.requirement_type
                                                  .replace(/_/g, " ")
                                                  .replace(
                                                    /\b\w/g,
                                                    (c: any) =>
                                                      c.toUpperCase()
                                                  )
                                                : "-"}
                                            </span>
                                          </td>
                                          <td className="py-2">
                                            {sub.subs_description ?? "-"}
                                          </td>
                                          <td className="py-2">
                                            Click for FAQ
                                          </td>

                                          {/* Checkbox Cell */}
                                         
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

            <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex capitalize">
              Parts Category
            </span>
            {data?.part?.length > 0 && (
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
                      Amends
                    </th>
                    <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                      Price ($)
                    </th>
                    <th className="py-3 px-4 w-[107px] justify-center min-w-[107px] font-medium text-[14px] items-center flex leading-[130%] tracking-normal text-white bg-[#212B3EBF] rounded-[9px] min-h-[48px] h-[48px] text-center">
                      View Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.part?.map((partItem: any, index: number) => (
                    <React.Fragment key={index}>
                      {/* Main Row */}
                      <tr className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal">
                        <td className="w-[90px] justify-center min-w-[90px]">
                          {partItem.number || "-"}
                        </td>

                        <td className="flex-1 flex flex-col text-left justify-start !items-start">
                          <span className="mb-1.5 text-[#4A90E2]">
                            {partItem.description}
                          </span>
                        </td>

                        <td className="w-[107px] justify-center min-w-[107px] space-x-2 text-center">
                          {partItem.subs?.length || 0}
                        </td>

                        <td className="w-[107px] justify-center min-w-[107px] space-x-2 text-center">
                          {partItem.price ?? "-"}
                        </td>

                        {/* Accordion Icon */}
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

                      {/* Sub row for subs (Amends) */}
                      {expandedRowId === getKey(partItem) && partItem.subs?.length > 0 && (
                        <tr className="w-full">
                          <td colSpan={5}>
                            <div className="bg-[#1B2738] rounded-md p-4 ml-4">
                              <table className="w-full table-auto">
                                <tbody>
                                  {partItem.subs.map(
                                    (sub: any, subIndex: number) => (
                                      <tr
                                        key={subIndex}
                                        className="text-[13px] text-white border-b border-[#2A3A4D]"
                                      >
                                        <td className="py-2">
                                          <span
                                            style={{
                                              color:
                                                sub.requirement_type ===
                                                  "requiring_checks"
                                                  ? "#F3811C"
                                                  : sub.requirement_type ===
                                                    "requiring_amend"
                                                    ? "#DE3140"
                                                    : sub.requirement_type ===
                                                      "general_suggestions"
                                                      ? "#7ED748"
                                                      : "inherit",
                                            }}
                                          >
                                            {sub.requirement_type
                                              ? sub.requirement_type
                                                .replace(/_/g, " ")
                                                .replace(/\b\w/g, (c: any) =>
                                                  c.toUpperCase()
                                                )
                                              : "-"}
                                          </span>
                                        </td>
                                        <td className="py-2">
                                          {sub.subs_description ?? "-"}
                                        </td>
                                        <td className="py-2">Click for FAQ</td>

                                        {/* Checkbox Cell */}
                                       
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

            <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex capitalize">
              General Suggestions
            </span>
            {data?.general_suggestions?.length > 0 && (
              <table className="w-full border-collapse text-white">
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
                    (suggestion: {
                      id: number;
                      suggestion: string;
                      agree: boolean;
                    }, index: number) => (
                      <tr
                        key={suggestion.id}
                        className="flex space-x-1 *:py-3 *:px-4 *:border-b *:border-[#162332] *:min-h-[48px] *:items-center *:flex *:text-[#8F9DAC] *:text-[14px] *:font-normal *:leading-[130%] *:tracking-normal"
                      >
                        <td className="flex-1 text-left !items-start">
                          {suggestion.suggestion}
                        </td>
                        
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}

            {/* <div className="flex items-center justify-end mt-8 w-full gap-6">
              <Input
                className=""
                placeholder="Please enter amended repair cost"
              />
              <Button variant={"default"}>
                <span className="text-[14px] font-medium leading-7">
                  Complete Job
                </span>
              </Button>
            </div> */}
            {/* {data?.status !== JOBSTATUS.COMPLETED && */}
        
            {/* } */}
          </div>
        </div>
      )}
    </div>
  );
}

export default page