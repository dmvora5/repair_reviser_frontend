import Image from 'next/image';
import React, { useRef } from 'react'

interface LoadingPopupProps {
    isOpen: boolean;
}

const LoadingPopup = ({ isOpen }: LoadingPopupProps) => {


    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
            <div
                className="bg-[#060A0E] text-white px-[48px] py-[30px] rounded-[20px] w-[501px] min-w-[501px] modelGradientBorder"
            >
                <div className="flex justify-center flex-col items-center mb-8 text-center">
                    <div className="bg-[#34A853]rounded-[6px] items-center justify-center mb-4">
                        <Image
                            src="/icons/WaitingLogo.svg"
                            width={50}
                            height={50}
                            alt='Logo'
                        />
                    </div>
                    <h2 className="text-[24px] font-medium leading-[130%] tracking-normal mb-3 text-white">
                        Please Wait a Moment...
                    </h2>
                    <span className="text-[#8F9DAC] font-normal text-[16px] leading-[130%] tracking-normal">
                        Your uploaded data is being analyzed.                     </span>
                    
                </div>
            </div>
        </div>
    )
}

export default LoadingPopup