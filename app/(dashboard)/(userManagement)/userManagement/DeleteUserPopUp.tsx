import ApiState from '@/components/ApiState';
import { Button } from '@/components/ui/button';
import { useDeleteUserMutation } from '@/redux/apis/userManagementApis';
import Image from 'next/image';
import React, { useRef } from 'react'


interface DeleteUserProps {
    isOpen: boolean;
    onClose: () => void;
    user: any
}
const DeleteUserPopUp: React.FC<DeleteUserProps> = ({
    isOpen,
    onClose,
    user
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const [submit, { isLoading, error, isSuccess, status, reset }] =
        useDeleteUserMutation();

    // Close modal when clicking outside of it
    const handleClickOutside = (e: React.MouseEvent) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(e.target as Node) &&
            status !== "pending"
        ) {
            onClose();
        }
    };


    const deleteUser = async () => {
        submit({
            id: user.id,
            is_active: false
        })
    }

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
                <ApiState isSuccess={isSuccess} error={error} reset={reset}>
                    <ApiState.SuccessMessage message="uesr delete sucessfully!" />
                    <ApiState.SuccessCallback callback={onClose} />
                    <ApiState.Error />
                    <ApiState.ArthorizeCheck />
                </ApiState>
                {/* Header */}
                <div className="flex justify-center flex-col items-center mb-8 text-center">
                    <h2 className="text-[24px] font-medium leading-[130%] tracking-normal mb-3 text-white">
                        Are You Sure?
                    </h2>
                    <span className="text -[#8F9DAC] font-normal text-[16px] leading-[20px] tracking-normal ">
                        Please make sure you want to delete user.
                    </span>
                </div>

                {/* Form */}
                <div className="flex flex-row gap-6 w-full">
                    <Button disabled={isLoading} type="submit" variant="outline" className="w-full" onClick={onClose}>
                        No
                    </Button>
                    <Button disabled={isLoading} onClick={deleteUser} type="submit" className="auth-button">
                        {isLoading ?
                            <Image
                                src="images/loader.svg"
                                alt="loader"
                                width={24}
                                height={24}
                                className="ml-2 animate-spin"
                            /> :
                            "Yes"
                        }

                    </Button>
                </div>
            </div>
        </div>
    );
}

export default DeleteUserPopUp