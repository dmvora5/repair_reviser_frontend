import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-white bg-black border border-[#242c3c] rounded-[20px] shadow-sm w-[834px] h-[566px]">
      <Tabs defaultValue="account" className="py-[30px] px-[48px]">
        <div className="space-y-6">
          <div className="space-y-4">
            <Image
              src="/images/AuthLogo.svg"
              width={131}
              height={40}
              alt="Logo"
              className="p-2 mx-auto"
            />
            <h1 className="text-3xl font-medium text-center">Sign Up Your Account As</h1>
          </div>
          <TabsList className="grid w-full grid-cols-2 bg-black">
            <TabsTrigger value="Individual" className="transition-none rounded-none data-[state=active]:bg-black data-[state=active]:text-brandRed data-[state=active]:border-b-brandRed data-[state=active]:font-bold data-[state=active]:border-b-2 text-[#8f9dac] pb-2">Account</TabsTrigger>
            <TabsTrigger value="Company" className="transition-none rounded-none data-[state=active]:bg-black data-[state=active]:text-brandRed data-[state=active]:border-b-brandRed data-[state=active]:font-bold data-[state=active]:border-b-2 text-[#8f9dac] pb-2">Password</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="Individual">
         
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
