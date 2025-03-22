import { ROLES } from "@/constant/roles";
import { PAGE_ROUTES } from "@/constant/routes";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const ComapnyLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: any = await getServerSession(authOptions);

  if (session?.role !== ROLES.COMPANY_ADMIN) {
    await signOut({
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}${PAGE_ROUTES.AUTH.LOGIN}`,
    });
    return redirect(PAGE_ROUTES.AUTH.LOGIN);
  }

  return children;
};

export default ComapnyLayout;
