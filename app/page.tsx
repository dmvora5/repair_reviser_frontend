"use client";

import { PAGE_ROUTES } from "@/constant/routes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: "/images/automatedCost.png",
      title: "Automated Cost Recommendations",
      description:
        "Our tool suggests extra labor time, verifies door skin allowances, flags stone-chipping protection, checks test fits & masking costs, and detects fadeout zones in paintwork.",
    },
    {
      icon: "/images/report.png",
      title: "PDF Job Processing",
      description:
        "Users upload a single PDF, and the system extracts repair data automatically. It identifies missing costs, labor adjustments, and material expenses.",
    },
    {
      icon: "/images/pricingModel.png",
      title: "Monetization & Pricing Model",
      description:
        "Our pricing includes both per-job and subscription models. The system also integrates with Thatcham Methods for accurate labor estimates.",
    },
    {
      icon: "/images/costAdjustment.png",
      title: "Cost Adjustments",
      description:
        "Our tool detects missing costs, underestimated labor, and plastic panel paint errors. It flags incorrect surface paint, recommends multi-tone changes, and identifies high-voltage vehicle costs.",
    },
    {
      icon: "/images/analytics.png",
      title: "Analytics & Insights",
      description:
        "Our tool tracks job counts, cost variations, and company-wide repair insights. It compares EV vs. Hybrid pricing and identifies upsell opportunities.",
    },
  ];
  const footerImg = [
    "/images/footerImg1.png",
    "/images/footerImg2.png",
    "/images/footerImg3.png",
    "/images/footerImg1.png",
  ];

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center "
      style={{ backgroundImage: "url('/images/Hero.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-10 py-5 text-white">
        <div>
          <Image
            src="/images/AuthLogo.svg"
            width={131}
            height={40}
            alt="Logo"
            className="p-2 mx-auto"
          />
        </div>
        <div className="flex flex-row items-center gap-10 z-50">
          <div className="flex space-x-6">
            <Link href="#">Home</Link>
            <Link href="#">About Us</Link>
            <Link href="#">Services</Link>
            <Link href="#">Registration</Link>
            <Link href="#">Contact Us</Link>
          </div>
          <Link href={PAGE_ROUTES.AUTH.LOGIN} className="bg-[#DE3140] h-[50px] px-8 py-3 text-[14px] min-h-[50px] flex justify-center items-center font-medium rounded-[6px] min-w-[150px]">Log In</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative flex flex-col items-start justify-center h-full  px-10 text-white">
        <div
          className="absolute inset-0 m-5"
          style={{
            backgroundImage: "url('/images/BlueLine.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            top: "100px",
            zIndex: 0,
          }}
        ></div>

        {/* Content Section */}
        <div className="relative z-10 px-20 w-[800px]">
          <div>
            <h2 className="text-[55px] font-medium leading-[64.8px]">
              <span className="text-blue-400">Identify Hidden</span>
              <br /> Repair Costs & 
              <br /> Optimize Estimates
            </h2>
            <p className="text-[18px] font-normal mt-5 leading-[28px]">
              Our tool identifies overlooked costs in Audatex and GT Motive
              estimates, ensuring accurate and complete repair assessments.
            </p>
          </div>
          <button className="mt-20 bg-[#DE3140] h-[50px] px-8 py-3 text-[14px] min-h-[50px] flex justify-center items-center font-medium rounded-[6px]">
            See How We Work
          </button>
        </div>

        {/* Social Media Icons */}
        <div className="absolute right-12 top-1/3 transform -translate-y-1/4 flex flex-col gap-4 z-10">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/instagram.png"
              alt="Instagram"
              className="w-8 h-8"
              height={32}
              width={32}

            />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/facebook.png"
              alt="Facebook"
              className="w-8 h-8"
              height={32}
              width={32}
            />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/twitter.png"
              alt="Twitter"
              className="w-8 h-8"
              height={32}
              width={32}
            />
          </a>
        </div>
      </div>

      {/* About us Section */}
      <section className="bg-black text-white py-16 px-6 md:px-20 lg:px-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <Image
              src="/images/aboutUs.png"
              width={500}
              height={300}
              alt="Repair Team"
              className="rounded-lg shadow-lg"
            />
            <p className="text-gray-400">
              By leveraging their FAQs and extracting insights from PDF reports,
              we identify missing repairs and ensure a more complete cost
              evaluation.
            </p>
            <p className="text-gray-400">
              Our goal is to provide accurate and transparent assessments,
              helping repair shops and vehicle owners make informed decisions
              and avoid unexpected expenses.
            </p>
            <p className="text-gray-400">
              Join us in redefining vehicle repair estimation with precision and
              clarity!
            </p>
            <button className="mt-4 bg-[#DE3140] h-[50px] px-8 py-3 text-[14px] min-h-[50px] flex justify-center items-center font-medium rounded-[6px]">
              Get Started Now
            </button>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-blue-400">Who we are:</span> Our story and
              mission
            </h2>
            <p className="text-gray-400">
              At Repair Reviser, we analyze vehicle repair estimates from
              Audatex and GT Motive to uncover overlooked costs and repairs.
              These systems often have blind spots that lead to inaccurate
              assessments.
            </p>
            <Image
              src="/images/aboutUs.png"
              width={500}
              height={300}
              alt="Repair Team"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <div className="relative w-full bg-[#0A0E13] text-white flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 mt-20 ">
          <span className="text-blue-400">How</span> it Works?
        </h2>
        <p className="text-lg text-gray-300 text-center max-w-2xl mb-10 mt-5 ">
          We make it easy to analyze repair estimates and identify overlooked
          costs. Follow these three simple steps to ensure a complete and
          accurate assessment.
        </p>
        <div className="w-full md:px-20 mb-0 ">
          <div className="bg-[#060A0E] p-6 md:p-8 rounded-lg shadow-lg border border-gray-700">
            <div className="flex flex-row gap-x-4">
              <div className="flex flex-row gap-x-4">
                <Image
                  src="/images/report.png"
                  width={500}
                  height={500}
                  alt="Person Walking"
                  className="h-full w-auto object-cover"
                />
                <div>
                  <h3 className="text-blue-400 text-sm md:text-md font-semibold mb-2">
                    STEP 1: UPLOAD ESTIMATE REPORT
                  </h3>
                  <h6 className="text-sm md:text-base font-semibold mb-4">
                    Submit your Audatex or GT Motive report
                  </h6>
                </div>
              </div>

              <ul className="list-disc pl-6 text-gray-300 text-md">
                <li>Click the "Upload Report" button.</li>
                <li>Drag & drop or select a PDF file from your device.</li>
                <li>Our system will securely process your estimate.</li>
              </ul>
            </div>
            <h6 className="text-sm md:text-base font-semibold mt-6 mb-1">
              What happens next?
            </h6>
            <p className="text-gray-400 mt-4">
              Your report will be scanned for labor costs, materials, repair
              operations, and any missing charges that should be accounted for.
            </p>
          </div>
        </div>
        <div className="relative mt-[-200px] ">
          <div className="flex flex-row items-end justify-center relative">
            <Image
              src="/images/walkingMen.png"
              width={286}
              height={516}
              alt="Person Walking"
              className="h-[450px] w-auto object-cover"
            />
            <div className="relative w-[900px]">
              <Image
                src="/images/CarImg.png"
                width={900}
                height={500}
                alt="Car"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="bg-[#060A0E] text-white ">
        <div
          className="w-full text-center md:text-left flex flex-row h-[400px]  py-20 px-4 md:px-12"
          style={{ backgroundImage: "url('/images/bgImg.png')" }}
        >
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">
            <span className="text-blue-500">Ensuring Accuracy</span> in Every
            Repair Estimate
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl">
            Our advanced tools and expertise ensure precise repair estimates by
            analyzing labor, materials, and manufacturer guidelines. We help you
            optimize costs, prevent errors, and streamline the repair process
            with accuracy and efficiency. With real-time insights and
            data-driven validation.
          </p>
        </div>

        {/* RepairEstimate */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 -mt-24 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#0B1219] p-6 rounded-lg shadow-md border border-gray-700"
            >
              <div className="flex  flex-col items-start gap-3 mb-4">
                <span className="bg-blue-500 text-white p-2 rounded-full">
                  <Image
                    src={feature.icon}
                    width={900}
                    height={500}
                    alt={feature.title}
                    className="h-auto w-full object-cover"
                  />
                </span>
                <h4 className="text-xl font-semibold">{feature.title}</h4>
              </div>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Form  */}

      <div className="bg-[#060A0E] text-white py-12">
        <div>
          <div
            className="h-[300px]"
            style={{ backgroundImage: "url('/images/registrationBgImg.png')" }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4 pt-12">
              <span className="text-blue-500">Interested</span> in using our
              service?
            </h2>
            <p className="text-gray-400 text-center mb-8 max-w-4xl mx-auto px-6">
              Our advanced tools and expertise ensure precise repair estimates
              by analyzing labor, materials, and manufacturer guidelines. We
              help you optimize costs, prevent errors, and streamline the repair
              process.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-[#0B1219] p-[55px] rounded-[24px] shadow-md max-w-4xl mx-auto -mt-24 ">
            <form className="space-y-[24px]">
              <div>
                <label className="block text-[16px] leading-[28px] font-normal mb-1">
                  Company name<span className="text-[#D32F2F]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-[#2A3A4BBF] font-normal text-[14px] focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder=""
                />
              </div>

              <div>
                <label className="block text-[16px] leading-[28px] font-normal mb-1.5">
                  Company mailing address<span className="text-[#D32F2F]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-[#2A3A4BBF] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[28px] py-3 text-[14px] font-normal placeholder:text-[#D5E4FFBF] focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Street address"
                />
              </div>

              {/* City, Postal Code, Country */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-[#2A3A4BBF] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[28px] py-3 text-[14px] font-normal placeholder:text-[#D5E4FFBF] focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="City"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-[#2A3A4BBF] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[28px] py-3 text-[14px] font-normal placeholder:text-[#D5E4FFBF] focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Postal Code"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-[#2A3A4BBF] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[28px] py-3 text-[14px] font-normal placeholder:text-[#D5E4FFBF] focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Country"
                  />
                </div>
              </div>

              {/* Email & Phone Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email<span className="text-[#D32F2F]">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-[#2A3A4BBF] font-normal text-[14px] focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder=""
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone number<span className="text-[#D32F2F]">*</span>
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-transparent border-b border-[#2A3A4BBF] font-normal text-[14px] focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder=""
                  />
                </div>
              </div>

              {/* Register Button */}
              <div>
                <button
                  className="w-full  text-white py-3 mt-2 text-[14px] font-medium rounded-lg min-h-[48px] bg-[#DE3140] transition"
                  style={{ backgroundColor: "#DE3140" }}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0B1219] text-white ">
        {/* Top Section with Images */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full mt-0">
          {footerImg.map((path, index) => (
            <Image
              key={index}
              src={path}
              width={500}
              height={300}
              alt="Repair Team"
              className="w-full h-64 object-cover"
            />
          ))}
        </div>
        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto px-6 mt-8 flex flex-col md:flex-row justify-between">
          <div className="space-y-2">
            <div className="pr-4">
              <Image
                src="/images/AuthLogo.svg"
                width={131}
                height={40}
                alt="Logo"
                className="p-2 mx-auto"
              />
            </div>

            <p className="text-gray-400">123 Demo Street</p>
            <p className="text-gray-400">New York, NY 12345</p>
            <p className="text-gray-400">email@example.com</p>
            <p className="text-gray-400">(555) 555 - 5555</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              Company
            </h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Subscription
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Social</h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  X
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 max-w-6xl mx-auto px-6 mt-8"></div>

        {/* Bottom Section - Copyright & Policies */}
        <div
          className="max-w-6xl mx-auto px-6 mt-8 flex flex-col md:flex-row justify-between text-gray-400 text-sm "
          style={{ paddingBottom: "50px" }}
        >
          <p>© 2025 EstimateXpert by XYZ. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}