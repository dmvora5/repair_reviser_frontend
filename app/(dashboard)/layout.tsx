import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PAGE_ROUTES } from '@/constant/routes';
import { authOptions } from '@/lib/auth'
import { Search } from 'lucide-react';
import { getServerSession } from 'next-auth'
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {

    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect(PAGE_ROUTES.AUTH.LOGIN);
    }
    return (
        <div className='p-6 bg-black min-h-screen flex'>
            <aside className='w-[20%] bg-[#0B1219] rounded-[16px] flex flex-col p-8 space-y-14'>
                <div>
                    <Image
                        src="/Logo.svg"
                        width={164}
                        height={50}
                        alt="Logo"
                    />
                </div>
                <ul className='space-y-4'>
                    <li className='text-white hover:text-white-hover'>
                        <Link href="/dashboard" className='flex gap-3 bg-brandRed min-h-[48px] items-center p-4  rounded-sm'>
                            <Image
                                src="/icons/User.svg"
                                height={18}
                                width={18}
                                alt='Logo'
                            />
                            <p>User Management</p>
                        </Link></li>

                </ul>
            </aside>
            <main className='flex-1'>
                <div className='flex flex-col px-6'>
                    <div className='w-full min-h-[50px] rounded-sm flex items-center  gap-4'>
                        <div className='bg-[#0c141c]  flex items-center flex-1 px-6'>
                            <Search width={30} height={30} color='white' />
                            <Input className='border-none text-xl h-[50px]' placeholder='search hear what you are looking for' />
                        </div>

                        <Button variant="ghost" className='hover:bg-transparent'>
                            <Image
                                src="/icons/Bail.svg"
                                width={50}
                                height={50}
                                alt='Logo'
                            />
                        </Button>
                    </div>
                    {children}
                </div>
            </main>
            <aside className='w-[25%] bg-[#0B1219] rounded-[16px]'>

            </aside>
        </div>
    )
}

export default DashboardLayout