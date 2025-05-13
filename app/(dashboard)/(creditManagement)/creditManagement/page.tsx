"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import AddCreditsPopup from "./AddCreditsPopup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreditPuchaseHistoryTable from "./CreditPuchaseHistoryTable";
import CreditUsedHistoryTable from "./CreditUsedHistoryTable";
import { useGetTotalCreditsQuery } from "@/redux/apis/creditsApi";

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, isFetching, data, refetch } = useGetTotalCreditsQuery(
    {},
  );

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center mb-8">
        <div className="flex flex-col flex-1">
          <span className="font-medium text-[32px] gap-2 flex items-center leading-[130%] tracking-normal text-white mb-2">
            <span>Available Credits: </span>{" "}
            <span className="text-[#DE3140] font-medium">
              {isLoading || isFetching
                ? "fetching..."
                : data?.credits?.toLocaleString()}
            </span>
          </span>
          <span className="text-[#8F9DAC] text-[16px] leading-[130%] font-normal">
            Add more credit to your account for your future purchases.
          </span>
        </div>
        <Button variant={"default"} onClick={() => setIsModalOpen(true)}>
          <span className="text-[14px] font-medium leading-7">Add Credits</span>
          <PlusIcon className="w-[24px]" />
        </Button>
      </div>
      <div className="flex flex-col w-full">
        <Tabs defaultValue="CreditPuchaseHistory" className="">
          <div className="">
            <TabsList className="grid w-full grid-cols-2 bg-black mb-6">
              <TabsTrigger
                value="CreditPuchaseHistory"
                className="transition-none rounded-none data-[state=active]:bg-black data-[state=active]:text-brandRed data-[state=active]:border-b-brandRed border-b border-[#1B2231] data-[state=active]:font-medium data-[state=active]:border-b-2 text-[#8f9dac] pb-3 leading-[20px]"
              >
                Credit Puchase History
              </TabsTrigger>
              <TabsTrigger
                value="CreditUsedHistory"
                className="transition-none rounded-none border-b border-[#1B2231] data-[state=active]:bg-black data-[state=active]:text-brandRed data-[state=active]:border-b-brandRed data-[state=active]:font-medium data-[state=active]:border-b-2 text-[#8f9dac] pb-3 leading-[20px]"
              >
                Credit Used History
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="CreditPuchaseHistory">
            <CreditPuchaseHistoryTable />
          </TabsContent>
          <TabsContent value="CreditUsedHistory">
            <CreditUsedHistoryTable />
          </TabsContent>
        </Tabs>
      </div>
      <AddCreditsPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default page;
