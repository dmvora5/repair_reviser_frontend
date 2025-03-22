import React, { ReactNode } from "react";
import { Button } from "primereact/button";

interface IProps {
  onClick?: (event: unknown) => void;
  children?: ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  isLoading?: boolean;
  primary?: boolean;
  secondary?: boolean;
  outlinePrimary?: boolean;
  outlineSecondary?: boolean;
  icon?: ReactNode | undefined;
  rightIcon?: ReactNode | undefined;
  size?: string;
  borderClass?: string;
  iconOnlyClass?: string;
}

const CustomButton = ({
  onClick,
  children,
  className = "",
  disabled = false,
  isLoading = false,
  type = "button",
  primary = false,
  secondary = false,
  outlinePrimary = false,
  outlineSecondary = false,
  icon = undefined,
  rightIcon = undefined,
  size = "",
  borderClass = "",
  iconOnlyClass = "",
}: IProps) => (
  <Button
    type={type}
    loading={isLoading}
    disabled={disabled}
    onClick={onClick}
    className={`min-w-fit flex justify-center gap-[6px] text-xs capitalize leading-[18px] font-semibold px-3 py-[9px] transition-all delay-[50] ${className} ${size} ${borderClass} ${iconOnlyClass} ${
      primary
        ? "h-[50px] min-h-[50px] font-medium text-[14px] rounded-[5px] border border-[#DE3140] leading-[28px]  text-white  hover:bg-[#DE3140] capitalize"
        : ""
    } ${
      outlinePrimary
        ? "shadow-InputAndButton rounded-lg border border-[#a4bcfd] bg-white shadow-xs text-primary700 !font-semibold hover:border-[#a4bcfd] text-blue-500 h-[36px] hover:bg-[#eef4ff] hover:text-blue-500 capitalize"
        : ""
    } ${
      secondary
        ? "bg-white hover:bg-gray-50 hover:border-gray-300  border border-gray-300 shadow-sm h-[36px] text-gray-700"
        : ""
    } ${
      outlineSecondary
        ? "text-btnText hover:bg-gray-50 border border-gray-300 capitalize"
        : ""
    } ${
      disabled && secondary
        ? "!bg-gray-100 opacity-50 border border-gray-200"
        : ""
    } shadow-InputAndButton`}
  >
    {icon}
    {children}
    {rightIcon}
  </Button>
);

export default CustomButton;
