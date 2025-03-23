"use client";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
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
          <h2 className="text-[32px] font-medium leading-[130%] tracking-normal mb-3 text-white">
            Add Credits
          </h2>
          <span className="text-[#8F9DAC] font-normal text-[14px] leading-[20px] tracking-normal">
            Enter Amount of Credit which you want to add
          </span>
          {/* <button className="text-gray-400 hover:text-white" onClick={onClose}>
            ✖
          </button> */}
        </div>

        {/* Form */}
        <div className="flex flex-col">
          <div className="flex flex-col mb-[32px]">
            <label className="block text-white font-medium text-[14px] leading-[24px] tracking-normal mb-1.5">
              Enter Credit
            </label>
            <input
              type="text"
              placeholder="Enter Here"
              className="w-full rounded-[6px] placeholder:text-[#8F9DAC] text-[14px] placeholder:text-[14px] font-normal placeholder:font-normal leading-5 h-[50px] px-4 flex items-center no-focus border border-[#1B2231] bg-[#0C141C] "
            />
          </div>
          <Button type="submit" className="auth-button">
            Pay via{" "}
            <Image
              src="/paypalicon.svg"
              height={24}
              width={90}
              className="!min-w-[90px] !w-[90px]"
              alt="Jobs"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCreditsPopup;
