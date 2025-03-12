import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" min-h-screen">
      <Header />
      <div className="bg-[url(/images/Hero.png)] min-h-screen w-full bg-no-repeat bg-cover bg-center bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% pt-20">
        <div className="relative h-[543px] w-[92%] mx-20 border-2 border-[#2A3A4B] rounded-b-3xl border-t-0">
          <div className="absolute left-[-3px] h-[194px] w-0 border-2 border-[#4a90e2]" />
        </div>
      </div>



    </div>
  );
}
