"use client";

import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CreditCard,
  FileUp,
  HelpCircle,
  History,
  LayoutDashboard,
  Lock,
  LogOut,
  MessagesSquare,
  Search,
  UserCog,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import LogOutPopup from "./(creditManagement)/creditManagement/LogOutPopup";
// import LogOutPopup from "./(creditManagement)/creditManagement/logOutPopup";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); // Get current route
  const [isLogoutOpen, setIsLogoutOpen] = useState(false); // State for logout popup

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "New Jobs",
      path: "/newJobs",
      icon: <FileUp size={18} />,
    },
    {
      name: "Previous jobs",
      path: "/previousJobs",
      icon: <History size={18} />,
    },
    {
      name: "User Management",
      path: "/userManagement",
      icon: <UserCog size={18} />,
    },
    {
      name: "Credit Management",
      path: "/creditManagement",
      icon: <CreditCard size={18} />,
    },
    {
      name: "Change Password",
      path: "/changePassword",
      icon: <Lock size={18} />,
    },
    {
      name: "FAQs",
      path: "/faqs",
      icon: <MessagesSquare size={18} />,
    },
  ];
  const menuItems2: { name: string; icon: React.JSX.Element; path?: string; onClick?: () => void }[] = [
    {
      name: "Help Center",
      path: "/helpCenter",
      icon: <HelpCircle size={18} />,
    },
    {
      name: "Log Out",
      onClick: () => setIsLogoutOpen(true), // Open popup when clicked
      icon: <LogOut size={18} />,
    },   
  ];

  return (
    <div className="p-6 bg-black min-h-screen flex flex-row overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[250px] min-w-[250px] bg-[#0B1219] rounded-[16px] flex flex-col px-4 pt-4">
        {/* Logo */}
        <div className="flex pl-3 mb-[30px]">
          <Image src="/Logo.svg" width={164} height={50} alt="Logo" />
        </div>

        {/* Navigation */}
        <ul className="space-y-3 overflow-y-auto flex flex-col flex-grow scrollbar-hide">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex min-h-[48px] px-3 rounded-[5px] items-center gap-3 font-medium text-[14px] leading-5 ${
                  pathname === item.path
                    ? "bg-[#DE3140] text-white"
                    : "text-[#8F9DAC] hover:bg-[#DE3140] hover:text-white"
                }`}
              >
                {item.icon} {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="space-y-3 overflow-y-auto flex flex-col flex-grow scrollbar-hide">
          {menuItems2.map((item) => (
            <li key={item.name}>
              {item.path ? (
                <Link
                  href={item.path}
                  className={`flex min-h-[48px] px-3 rounded-[5px] items-center gap-3 font-medium text-[14px] leading-5 ${
                    pathname === item.path
                      ? "bg-[#DE3140] text-white"
                      : "text-[#8F9DAC] hover:bg-[#DE3140] hover:text-white"
                  }`}
                >
                  {item.icon} {item.name}
                </Link>
              ) : (
                <button
                  onClick={item.onClick}
                  className="flex w-full min-h-[48px] px-3 rounded-[5px] items-center gap-3 font-medium text-[14px] leading-5 text-[#8F9DAC] hover:bg-[#DE3140] hover:text-white"
                >
                  {item.icon} {item.name}
                </button>
              )}
            </li>
          ))}
        </ul>

      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto h-full scrollbar-hide max-h-[calc(100vh-48px)]">
        <div className="flex flex-col px-6 w-full flex-1">
          {/* Search Bar & Notifications */}
          <div className="w-full min-h-[50px] flex items-center gap-6 mb-8">
            <div className="bg-[#0C141C] border border-[#1B2231] h-[50px] rounded-[6px] flex items-center flex-1 px-4">
              <Search width={20} height={20} color="white" />
              <Input
                className="border-none text-xl no-focus placeholder:text-[#8F9DAC] text-white font-medium text-[14px] tracking-normal leading-5 pr-0"
                placeholder="Search here what you are looking for..."
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent"
            >
              <Image
                src="/icons/Bail.svg"
                width={50}
                height={50}
                alt="Notifications"
              />
            </Button>
          </div>

          {/* Page Content */}
          {children}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-[351px] min-w-[351px] bg-[#0B1219] rounded-2xl p-4 flex flex-col overflow-y-auto scrollbar-hide max-h-[calc(100vh-48px)]">
        {/* User Info */}
        <div className="bg-[#060A0E] flex items-center gap-4 p-4 rounded-xl mb-6">
          <Image
            src="/uesrIcon.svg"
            width={48}
            height={48}
            className="min-w-[48px]"
            alt="User"
          />
          <div className="flex flex-col">
            <span className="font-medium text-[22px] mb-1.5 leading-[29px] text-white">
              Jack Peterson
            </span>
            <span className="text-[#8F9DAC] font-normal text-[14px] leading-[18px]">
              jackpeterson12@gmail.com
            </span>
          </div>
        </div>

        {/* Summary Section */}
        <p className="leading-[23px] text-[18px] font-medium text-white mb-6">
          Overall Summary
        </p>

        {/* Available Credits */}
        <div className="relative p-4 bg-[#060A0E] rounded-xl borderGradient mb-4">
          <div className="flex items-start gap-4 mb-[31px]">
            <Image
              src="/CreditsIcon.svg"
              width={48}
              height={48}
              className="min-w-[48px]"
              alt="Credits"
            />
            <div className="flex flex-col">
              <span className="text-[#8F9DAC] font-medium text-[16px] leading-[21px]">
                Available Credits
              </span>
              <span className="text-white font-medium text-[40px] leading-[48px] tracking-[0.01rem]">
                2,500
              </span>
            </div>
          </div>
          <Button
              variant="outline"
              className="w-full">
            Add More Credits
          </Button>
        </div>

        {/* Total Jobs */}
        <div className="relative p-4 bg-[#060A0E] rounded-xl borderGradient">
          <div className="flex items-start gap-4">
            <Image
              src="/fileIcon.svg"
              width={48}
              height={48}
              className="min-w-[48px]"
              alt="Jobs"
            />
            <div className="flex flex-col">
              <span className="text-[#8F9DAC] font-medium text-[16px] leading-[21px]">
                Total Jobs
              </span>
              <span className="text-white font-medium text-[40px] leading-[48px] tracking-[0.01rem]">
                1,210
              </span>
            </div>
          </div>
        </div>
      </aside>
      {isLogoutOpen && <LogOutPopup isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />}
    </div>
  );
};

export default DashboardLayout;
