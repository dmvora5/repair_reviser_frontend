"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetAmendsQuery,
  useUpdateAmendsMutation,
  useUpdateBulkAmendsMutation,
  useUpdateGeneralSuggestionsMutation,
  useUpdateRepaireCostMutation,
  useGetAmendsSubQuery,
} from "@/redux/apis/jobsApi";
import { creditsApi } from "@/redux/apis/creditsApi";
import { useDispatch } from "react-redux";
import { errorToast, sucessToast } from "@/utils";
import MainDataUI from "@/components/MainDataUI"; // import your UI component here
import ProcessLoader from "@/components/ProcessLoader";
import { Switch } from "@/components/ui/switch";
import { ChevronsLeft } from "lucide-react";
import SubDataUI from "@/components/SubDataUI";
import { PAGE_ROUTES } from "@/constant/routes";

const AgreeingAmendsPage = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();

  const [expandedRowId, setExpandedRowId] = useState<any>(null);
  const [repaireCost, setRepaireCost] = useState("");
  const [copyData, setCopyData] = useState<any>({});
  const [checkedIds, setCheckedId] = useState<any[]>([]);
  const [genrelCheckedId, setGenralCheckedId] = useState<any[]>([]);
  const [removecheckedIds, setRemovedCheckedId] = useState<any[]>([]);
  const [removedgenrelCheckedId, setRemovedGenralCheckedId] = useState<any[]>(
    []
  );
  const [showSubData, setShowSubData] = useState(false);
  const [localSubData, setLocalSubData] = useState<any>(null);

  // Fetch data hooks
  const { data, isLoading, error, isFetching } = useGetAmendsQuery(params.id, {
    skip: !params.id,
  });

  const {
    data: subData,
    isLoading: issubDataLoading,
    error: issubDataError,
    isFetching: issubDataFetching,
  } = useGetAmendsSubQuery(params.id, {
    skip: !params.id,
  });

  // Update mutations
  const [updateRepaireCost, { isLoading: isUpdateRepaireCostLoading }] =
    useUpdateRepaireCostMutation();

  const [submit, { isLoading: isAmendsDataLoading }] =
    useUpdateAmendsMutation();

  const [
    bulkSubmit,
    {
      isLoading: isBulkAmendsDataLoading,
      error: isBulkAmendsDataError,
      isSuccess: isBulkAmendsDataSuccess,
    },
  ] = useUpdateBulkAmendsMutation();

  const [submitGeneralSuggestions, { isLoading: isGeneralDataLoading }] =
    useUpdateGeneralSuggestionsMutation();

  // Set copyData when main data loads
  useEffect(() => {
    if (data) {
      setCopyData(JSON.parse(JSON.stringify(data)));
    }
  }, [data]);

  // When subData is fetched, copy it locally once
  useEffect(() => {
    if (showSubData && subData) {
      setLocalSubData(JSON.parse(JSON.stringify(subData))); // Deep clone
    }
  }, [showSubData, subData]);

  // Toggle row expand/collapse
  // In AgreeingAmendsPage.tsx
  const getKey = (item: any) => `${item?.description}-${item?.number}`;
  const getKeySub = (item: any) => {
    // For sub data (has subs_description and requirement_type)
    return `${item?.subs_description || item?.description}-${
      item?.requirement_type
    }-${item?.unique_id}`;
  };

  const toggleRow = (item: any) => {
    const key = getKey(item);
    setExpandedRowId((prev: any) => (prev === key ? null : key));
  };
  const toggleRowSub = (item: any) => {
    const key = getKeySub(item);
    setExpandedRowId((prev: any) => (prev === key ? null : key));
  };

  // Handle toggling agree checkbox for labour/paint/part and general suggestions
  const handleAgreeToggle = (
    e: any,
    sub: { id: number; agree: boolean },
    name: string,
    index: number,
    subIndex: number
  ) => {
    try {
      const checked = e?.target?.checked;
      const state = { ...copyData };
      if (name !== "general_suggestions") {
        state[name][index].subs[subIndex].agree = checked;

        if (checked) {
          setCheckedId((prev) => [...new Set([...prev, sub.id])]);
          setRemovedCheckedId((prev) => prev.filter((id) => id !== sub.id));
        } else {
          setCheckedId((prev) => prev.filter((id) => id !== sub.id));
          setRemovedCheckedId((prev) => [...new Set([...prev, sub.id])]);
        }
      } else {
        state.general_suggestions[index].agree = checked;

        if (checked) {
          setGenralCheckedId((prev) => [...new Set([...prev, sub.id])]);
          setRemovedGenralCheckedId((prev) =>
            prev.filter((id) => id !== sub.id)
          );
        } else {
          setGenralCheckedId((prev) => prev.filter((id) => id !== sub.id));
          setRemovedGenralCheckedId((prev) => [...new Set([...prev, sub.id])]);
        }
      }
      setCopyData(state);
    } catch (error) {
      console.error("Failed to update amend agree:", error);
    }
  };
  // ✅ This replaces old handleAgreeToggleSub inside AgreeingAmendsPage.tsx
  // const handleAgreeToggleSub = (
  //   category: string,
  //   parentId: string,
  //   itemId: string,
  //   field: string
  // ) => {
  //   console.log("category, :>> ", category, parentId, itemId, field);
  //   const newData = JSON.parse(JSON.stringify(localSubData));
  //   console.log("🚀 ~ AgreeingAmendsPage ~ newData:", newData);
  //   const section = newData?.[category];
  //   console.log("🚀 ~ AgreeingAmendsPage ~ section:", section);

  //   if (!section) return;

  //   const parentItem = section.find((item: any) => item.unique_id === parentId);
  //   console.log("🚀 ~ AgreeingAmendsPage ~ parentItem:", parentItem)
  //   if (!parentItem) return;

  //   const subItem = parentItem.subs.find((i: any) => i.id === itemId);
  //   console.log("🚀 ~ AgreeingAmendsPage ~ subItem:", subItem)
  //   if (!subItem) return;

  //   subItem[field] = !subItem[field];

  //   setLocalSubData(newData);
  // };

  const handleAgreeToggleSub = (
    e: React.ChangeEvent<HTMLInputElement>,
    sub: { id: number; agree: boolean },
    category: string,
    parentId: string,
    itemId: string
  ) => {
    try {
      const checked = e.target.checked;
      const newData = JSON.parse(JSON.stringify(localSubData));

      const section = newData?.[category];
      if (!section) return;

      const parentItem = section.find(
        (item: any) => item.unique_id === parentId
      );
      if (!parentItem) return;

      const subItem = parentItem.subs.find((i: any) => i.id === itemId);
      if (!subItem) return;

      // Update agree flag on the subItem
      subItem.agree = checked;

      // Update checked / removed IDs accordingly
      if (checked) {
        setCheckedId((prev) => [...new Set([...prev, sub.id])]);
        setRemovedCheckedId((prev) => prev.filter((id) => id !== sub.id));
      } else {
        setCheckedId((prev) => prev.filter((id) => id !== sub.id));
        setRemovedCheckedId((prev) => [...new Set([...prev, sub.id])]);
      }

      setLocalSubData(newData);
    } catch (error) {
      console.error("Failed to update amend agree:", error);
    }
  };

  // Handle toggling agree checkbox for general suggestions (single item)
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

  // Save bulk agree/disagree changes
  const handleSave = async () => {
    try {
      await bulkSubmit({
        accepted_ids: checkedIds,
        rejected_ids: removecheckedIds,
        general_suggestion_accepted_ids: genrelCheckedId,
        general_suggestion_rejected_ids: removedgenrelCheckedId,
      }).unwrap();
    } catch (err) {
      console.error("Error in bulk save:", err);
    }
  };
  const handleSaveSub = async () => {
    try {
      await bulkSubmit({
        accepted_ids: checkedIds,
        rejected_ids: removecheckedIds,
        general_suggestion_accepted_ids: genrelCheckedId,
        general_suggestion_rejected_ids: removedgenrelCheckedId,
      }).unwrap();
    } catch (err) {
      console.error("Error in bulk save:", err);
    }
  };

  // Update repair cost and complete job
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
      dispatch(creditsApi.util.invalidateTags(["Credits"]));
      router.replace(PAGE_ROUTES.JOBS.JOBDETAILS);
    } catch (error) {
      console.error("Failed to update repair cost:", error);
      errorToast("Failed to update repair cost.");
    }
  };

  if (
    isLoading ||
    isFetching ||
    isAmendsDataLoading ||
    isGeneralDataLoading ||
    isBulkAmendsDataLoading
  ) {
    return (
      <div className="text-white flex justify-center items-center h-[80vh]">
        <ProcessLoader />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col flex-1 px-4 py-6">
      {/* Back and toggle switch */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-white text-lg font-normal cursor-pointer"
        >
          <ChevronsLeft className="w-6 h-6 text-[#DE3140]" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2 bg-gray-900 px-3 py-1 rounded-md text-white">
          <span>Main</span>
          <Switch
            checked={showSubData}
            onCheckedChange={() => setShowSubData(!showSubData)}
          />
          <span>Sub</span>
        </div>
      </div>

      {/* Title and actions */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-medium text-white">Agreeing amends</h1>

        <div className="flex gap-4">
          {/* <button
            onClick={() => router.push("/faq")}
            className="px-6 py-2 border border-[#DE3140] rounded-md text-white text-sm font-normal hover:bg-[#DE3140] hover:border-[#DE3140] transition-colors duration-300"
          >
            Required FAQs
          </button> */}
          <button
            onClick={() => router.push(`/previousJobs/amends-agreed/view-aggreed/${params.id}`)}
            className="px-6 py-2 border border-[#DE3140] rounded-md text-white text-sm font-normal hover:bg-[#DE3140] hover:border-[#DE3140] transition-colors duration-300"
          >
            View Agreed Amends
          </button>
        </div>
      </div>

      {showSubData && localSubData ? (
        <SubDataUI
          data={localSubData}
          expandedRowId={expandedRowId}
          toggleRow={toggleRowSub} // Make sure this is passed correctly
          handleAgreeToggle={handleAgreeToggleSub}
          repaireCost={repaireCost}
          setRepaireCost={setRepaireCost}
          handleSave={handleSaveSub}
          handleUpdate={handleUpdate}
          isAmendsDataLoading={isAmendsDataLoading}
          isBulkAmendsDataLoading={isBulkAmendsDataLoading}
          isUpdateRepaireCostLoading={isUpdateRepaireCostLoading}
          isGeneralDataLoading={isGeneralDataLoading}
        />
      ) : (
        <MainDataUI
          data={copyData}
          expandedRowId={expandedRowId}
          toggleRow={toggleRow}
          handleAgreeToggle={handleAgreeToggle}
          handleGeneralAgreeToggle={handleGeneralAgreeToggle}
          repaireCost={repaireCost}
          setRepaireCost={setRepaireCost}
          handleSave={handleSave}
          handleUpdate={handleUpdate}
          isAmendsDataLoading={isAmendsDataLoading}
          isBulkAmendsDataLoading={isBulkAmendsDataLoading}
          isUpdateRepaireCostLoading={isUpdateRepaireCostLoading}
          isGeneralDataLoading={isGeneralDataLoading}
        />
      )}
    </div>
  );
};

export default AgreeingAmendsPage;
