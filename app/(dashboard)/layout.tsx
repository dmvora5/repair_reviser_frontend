import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {

    const session = await getServerSession(authOptions);

    console.log('session', session)

    return (
        <div className='p-6 bg-black min-h-screen flex'>
            <aside className='w-[20%] bg-[#0B1219] rounded-[16px]'>

            </aside>
            <main className='flex-1'>
                {children}
            </main>
            <aside className='w-[25%] bg-[#0B1219] rounded-[16px]'>

            </aside>
        </div>
    )
}

export default DashboardLayout