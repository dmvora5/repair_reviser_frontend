"use client";

import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  useGetAmendsQuery,
  useUpdateAmendsMutation,
  useUpdateBulkAmendsMutation,
  useUpdateGeneralSuggestionsMutation,
  useUpdateRepaireCostMutation,
} from "@/redux/apis/jobsApi";
import ApiState from "@/components/ApiState";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { errorToast, sucessToast } from "@/utils";
import Link from "next/link";
import { PAGE_ROUTES } from "@/constant/routes";
import { JOBSTATUS } from "@/constant";
import Image from "next/image";
import ProcessLoader from "@/components/ProcessLoader";
import { creditsApi } from "@/redux/apis/creditsApi";
import { useDispatch } from "react-redux";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const [expandedRowId, setExpandedRowId] = useState<any>(null);
  const [repaireCost, setRepaireCost] = useState("");
  const [copyData, setCopyData] = useState<any>({});
  const [checkedIds, setCheckedId] = useState<any[]>([]);
  const [genrelCheckedId, setGenralCheckedId] = useState<any[]>([]);

  const [removecheckedIds, setRemovedCheckedId] = useState<any[]>([]);
  const [removedgenrelCheckedId, setRemovedGenralCheckedId] = useState<any[]>([]);


  const dispatch = useDispatch()

  const getKey = (item: any) => `${item?.description}-${item?.number}`

  const toggleRow = (item: any) => {
    const key = getKey(item);
    setExpandedRowId((prev: any) => (prev === key ? null : key));
  };

  const { data, isLoading, error, isSuccess, isFetching } = useGetAmendsQuery(
    params.id,
    {
      skip: !params.id, // Don't fetch until job ID is set
    }
  );



  useEffect(() => {
    if (!data) return;
    setCopyData(JSON.parse(JSON.stringify(data)))
  }, [data])

  const [updateRepaireCost, { isLoading: isUpdateRepaireCostLoading }] =
    useUpdateRepaireCostMutation();

  const [
    submit,
    {
      isLoading: isAmendsDataLoading,
      error: isAmendsDataError,
      isSuccess: isAmendsDataSuccess,
    },
  ] = useUpdateAmendsMutation();

  const [
    bulkSubmit,
    {
      isLoading: isBulkAmendsDataLoading,
      error: isBulkAmendsDataError,
      isSuccess: isBulkAmendsDataSuccess,
    },
  ] = useUpdateBulkAmendsMutation();



  const [
    submitGeneralSuggestions,
    {
      isLoading: isGeneralDataLoading,
      error: isGeneralDataError,
      isSuccess: isGeneralDataSuccess,
    },
  ] = useUpdateGeneralSuggestionsMutation();

  const handleGeneralAgreeToggle = async (item: {
    id: number;
    agree: boolean;
  }) => {
    try {
      await submitGeneralSuggestions({
        id: item.id,
        agree: !item.agree,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update suggestion agree:", error);
    }
  };

  const handleAgreeToggle = async (e: any, sub: { id: number; agree: boolean }, name: string, index: number, subIndex: number) => {
    try {
      console.log('e', e?.target?.checked)
      const state = { ...copyData };
      if (name !== "general_suggestions") {
        state[name][index].subs[subIndex].agree = e?.target?.checked;
        if (e?.target?.checked) {
          setCheckedId(prev => [...new Set([...prev, sub?.id])])
          setRemovedCheckedId(prev => prev.filter(ele => ele !== sub?.id))
        } else {
          setCheckedId(prev => prev.filter(ele => ele !== sub?.id))
          setRemovedCheckedId(prev => [...new Set([...prev, sub?.id])])

        }
      } else {
        state.general_suggestions[index].agree = e?.target?.checked;
        if (e?.target?.checked) {
          setGenralCheckedId(prev => [...new Set([...prev, sub?.id])])
          setRemovedGenralCheckedId(prev => prev.filter(ele => ele !== sub?.id))

        } else {
          setGenralCheckedId(prev => prev.filter(ele => ele !== sub?.id))
          setRemovedGenralCheckedId(prev => [...new Set([...prev, sub?.id])])
        }
      }

      setCopyData(state);

      // await submit({
      //   id: sub.id,
      //   agree: !sub.agree,
      // }).unwrap();
    } catch (error) {
      console.log("Failed to update amend agree:", error);
    }
  };

  const handleSave = async () => {
    try {

      await bulkSubmit({
        accepted_ids: checkedIds,
        rejected_ids: removecheckedIds,
        general_suggestion_accepted_ids: genrelCheckedId,
        general_suggestion_rejected_ids: removedgenrelCheckedId
      })
    } catch (err: any) {
      console.log('err', err)
    }
  }

  const handleUpdate = async () => {
    if (!repaireCost || isNaN(Number(repaireCost))) {
      alert("Please enter a valid repair cost.");
      return;
    }

    try {
      await updateRepaireCost({
        id: params.id,
        repaire_cost: parseFloat(repaireCost),
      }).unwrap();
      sucessToast("Repair cost updated and job completed!");
      dispatch(creditsApi.util.invalidateTags(["Credits"]))
      router.replace(PAGE_ROUTES.JOBS.JOBDETAILS)
    } catch (error) {
      console.error("Failed to update repair cost:", error);
      errorToast("Failed to update repair cost.");
    }
  };

  return (
    <div className="relative flex flex-col flex-1">
      <ApiState isSuccess={isBulkAmendsDataSuccess} error={isBulkAmendsDataError}>
        <ApiState.ArthorizeCheck />
        <ApiState.SuccessCallback callback={() => setCheckedId([])} />
      </ApiState>
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
            <Button variant="outline" className="h-[42px] px-6">
              <Link href={PAGE_ROUTES.FAQ}>
                Required FAQs
              </Link>
            </Button>
            <Button variant="outline" className="h-[42px] px-6">
              <Link href={PAGE_ROUTES.JOBS.VIEWAGGRED + params.id}>
                View Agreed Amends
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {(isLoading || isFetching || isAmendsDataLoading || isGeneralDataLoading || isBulkAmendsDataLoading) ? (
        <div className="text-white flex justify-center items-center h-[80vh]">
          <ProcessLoader />
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="w-full">
            <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex capitalize">
              Labour Category
            </span>
            {copyData?.labour?.length > 0 && (
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
                  {copyData?.labour?.map((labourItem: any, index: number) => (
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
                                          <td className="py-2 text-center">
                                            <input
                                              type="checkbox"
                                              checked={sub.agree}
                                              onChange={(e) =>
                                                handleAgreeToggle(e, sub, "labour", index, subIndex)
                                              }
                                              className="accent-blue-500 w-4 h-4 cursor-pointer"
                                            />
                                          </td>
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
            {copyData?.paint?.length > 0 && (
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
                  {copyData?.paint?.map((paintItem: any, index: number) => (
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
                                          <td className="py-2 text-center">
                                            <input
                                              type="checkbox"
                                              checked={sub.agree}
                                              onChange={(e) =>
                                                handleAgreeToggle(e, sub, "paint", index, subIndex)
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

            <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex capitalize">
              Parts Category
            </span>
            {copyData?.part?.length > 0 && (
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
                  {copyData?.part?.map((partItem: any, index: number) => (
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
                                        <td className="py-2 text-center">
                                          <input
                                            type="checkbox"
                                            checked={sub.agree}
                                            onChange={(e) =>
                                              handleAgreeToggle(e, sub, "part", index, subIndex)
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

            <span className="text-white text-[18px] font-medium leading-[130%] mb-4 flex capitalize">
              General Suggestions
            </span>
            {copyData?.general_suggestions?.length > 0 && (
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
                  {copyData.general_suggestions.map(
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
                        <td className="w-[90px] justify-center min-w-[90px] text-center">
                          <input
                            type="checkbox"
                            checked={suggestion.agree}
                            onChange={(e) =>
                              handleAgreeToggle(e, suggestion, "general_suggestions", index, 0)
                            }
                            className="accent-blue-500 w-4 h-4 cursor-pointer"
                          />
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
            <div className="flex items-center justify-end mt-8 w-full gap-6">
              <Input
                type="number"
                value={repaireCost}
                onChange={(e) => setRepaireCost(e.target.value)}
                placeholder="Please enter amended repair cost"
              />
              <Button
                variant={"default"}
                onClick={handleUpdate}
                disabled={isUpdateRepaireCostLoading}
              >
                <span className="text-[14px] font-medium leading-7">
                  {isUpdateRepaireCostLoading ?
                    <Image
                      src="/images/loader.svg"
                      alt="loader"
                      width={24}
                      height={24}
                      className="ml-2 animate-spin"
                    /> : "Confirm amends"}
                </span>
              </Button>
              <Button
                variant={"default"}
                onClick={handleSave}
                disabled={isBulkAmendsDataLoading}
              >
                <span className="text-[14px] font-medium leading-7">
                  {isBulkAmendsDataLoading ?
                    <Image
                      src="/images/loader.svg"
                      alt="loader"
                      width={24}
                      height={24}
                      className="ml-2 animate-spin"
                    /> : "Update Agree Amends"}
                </span>
              </Button>
            </div>
            {/* } */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
