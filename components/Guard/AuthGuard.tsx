'use client'

import { PAGE_ROUTES } from "@/constant/routes";
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthGuard = ({ roles, children }: { roles: string[], children: React.ReactNode }) => {

    const { data } = useSession();
    const router = useRouter();


    useEffect(() => {

        if(!data) return;

        if (!roles.includes((data as any)?.role)) {
            (async () => {
                await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}${PAGE_ROUTES.AUTH.LOGIN}` })
                router.replace(PAGE_ROUTES.AUTH.LOGIN);
            })()
        }

    }, [data, roles])





    return children
}

export default AuthGuard