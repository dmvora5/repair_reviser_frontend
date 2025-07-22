"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import JobList from '../_components/JobList';
import { useGetUserAnalyticsQuery } from '@/redux/apis/jobsApi';

//response formet
// {
//     "chart": [
//         {
//             "month": "1-2025",
//             "total_jobs": 0
//         },
//         {
//             "month": "2-2025",
//             "total_jobs": 0
//         },
//         {
//             "month": "3-2025",
//             "total_jobs": 0
//         },
//         {
//             "month": "4-2025",
//             "total_jobs": 0
//         },
//         {
//             "month": "5-2025",
//             "total_jobs": 0
//         },
//         {
//             "month": "6-2025",
//             "total_jobs": 0
//         },
//         {
//             "month": "7-2025",
//             "total_jobs": 0
//         },
//         {
//             "month": "8-2025",
//             "total_jobs": 0
//         },
//         {
//             "month": "9-2025",
//             "total_jobs": 0
//         },
//         {
//             "month": "10-2025",
//             "total_jobs": 0
//         },
//         {
//             "month": "11-2025",
//             "total_jobs": 0
//         },
//         {
//             "month": "12-2025",
//             "total_jobs": 0
//         }
//     ],
//     "total_jobs": 0
// }

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const page = () => {
  const [selectedYear, setSelectedYear] = useState(2023);


  const {
    data: AnalyticsData,
    isLoading,
    error,
    isSuccess,
    isFetching,
  } = useGetUserAnalyticsQuery("47",
    // {
    //   skip: !params.id, // Don't fetch until job ID is set
    // }
  );

  console.log('AnalyticsData', AnalyticsData)

  // Example sales data for multiple years
  const salesData: any = {
    2023: [65, 59, 80, 81, 56, 55, 40, 60, 75, 85, 90, 100], // Sales data for 2023
    2024: [55, 60, 78, 82, 65, 62, 47, 69, 80, 91, 95, 110], // Sales data for 2024
  };

  const handleYearChange = (event: any) => {
    setSelectedYear(event.target.value);
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Sales Over Time',
        data: salesData[selectedYear],
        fill: false,
        borderColor: '#DE3140',
        tension: 0.1,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Sales Performance for ${selectedYear}`,
      },
      legend: {
        position: 'top', // Position the legend at the top
      },
      tooltip: {
        enabled: true, // Enable tooltips
        mode: 'nearest',
        intersect: false,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: false,
    },
  };

  return (
    <div className='w-full p-8'>
      {/* Year Dropdown */}
      <div className="mb-6">
        <label htmlFor="year" className="text-sm font-medium text-white">Select Year</label>
        <select
          id="year"
          className="mt-2 w-full p-3 bg-[#1F2A39] text-white border border-[#D3D3D3] rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#DE3140] focus:border-transparent transition-all"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
          {/* You can add more years as required */}
        </select>
      </div>

      {/* Available Credits Section */}
      <div className='w-full'>
        <div className="relative p-6 bg-[#060A0E] rounded-xl border-gradient-to-r from-[#1F2A39] to-[#28324A] mb-8">
          <div className="flex items-start gap-4 mb-8">
            <Image
              src="/CreditsIcon.svg"
              width={48}
              height={48}
              className="min-w-[48px]"
              alt="Credits"
            />
            <div className="flex flex-col">
              <span className="text-[#8F9DAC] font-medium text-lg leading-[21px]">Available Credits</span>
              <span className="text-white font-semibold text-4xl leading-[48px] tracking-wide">
                100
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Line Chart Section */}
      <div className='flex justify-between gap-8'>
        <div className='flex-1'>
          <h2 className="text-2xl font-semibold mb-4 text-white">Sales Performance</h2>
          <Line data={data} options={options} />
        </div>
      </div>

      {/* Job List */}
      <div>
        <JobList />
      </div>
    </div>
  )
}

export default page;
