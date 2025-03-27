"use client";

import { Button } from "@/components/ui/button";
import { CircleCheck, Eye, EyeOff, TicketCheck } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

interface AddCreditsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCreditsPopup: React.FC<AddCreditsPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside of it
  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleClickOutside} // Handle outside click
    >
      <div
        ref={modalRef}
        className="bg-[#060A0E] text-white px-[48px] py-[30px] rounded-[20px] w-[501px] min-w-[501px] modelGradientBorder"
      >
        {/* Header */}
        <div className="flex justify-center flex-col items-center mb-8 text-center">
          <div className="bg-[#34A853] flex flex-col w-[50px] h-[50px] rounded-[6px] items-center justify-center mb-4">
              <CircleCheck className="w-[24px] text-white" />
          </div>
          <h2 className="text-[24px] font-medium leading-[130%] tracking-normal mb-3 text-white">
          Created Successfully.
          </h2>
          <span className="text-[#8F9DAC] font-normal text-[16px] leading-[130%] tracking-normal">
          You have created the new user successfully.
          </span>
          {/* <button className="text-gray-400 hover:text-white" onClick={onClose}>
            ✖
          </button> */}
        </div>

       
          <Button type="submit" className="auth-button">
          Continue
          </Button>
      </div>
    </div>
  );
};

export default AddCreditsPopup;
