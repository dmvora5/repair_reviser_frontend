import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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