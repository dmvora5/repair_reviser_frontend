import { Clock3 } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react'

interface LoadingPopupProps {
    isOpen: boolean;
}

const LoadingPopup = ({ isOpen }: LoadingPopupProps) => {


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div
                    className="bg-[#060A0E] text-white px-[48px] py-[62px] rounded-[20px] w-[501px] min-w-[501px] modelGradientBorder"
                >
                    <div className="flex justify-center flex-col items-center text-center">
                        <div className="bg-[#4A90E2] w-[50px] h-[50px] min-w-[50px] flex rounded-[6px] items-center justify-center mb-4">
                            <Clock3  className="text-white w-5 h-5"/>
                        </div>
                        <h2 className="text-[24px] font-medium leading-[130%] tracking-normal mb-3 text-white">
                            Please Wait a Moment...
                        </h2>
                        <span className="text-[#8F9DAC] font-normal text-[16px] leading-[130%] tracking-normal">
                            Your uploaded data is being analyzed. 
                        </span>
                    </div>
                </div>
            </div>
    )
}

export default LoadingPopup