import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AuthLayout
    = ({ children }: { children: React.ReactNode }) => {
        return (
            <div className='relative flex justify-center items-center bg-authBlack w-full h-screen'>
                <Link href="/" className='absolute top-6 left-6 text-white'>
                    <Image
                        src="/images/AuthLogo.svg"
                        width={131}
                        height={40}
                        alt="Logo"
                        className="p-2 mx-auto"
                    /></Link>
                {children}
            </div>
        )
    }

export default AuthLayout
