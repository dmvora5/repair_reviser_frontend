"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import JobList from '../../_components/JobList';
import { useGetUserAnalyticsQuery } from '@/redux/apis/jobsApi';
import ProcessLoader from '@/components/ProcessLoader';
import { useParams, useRouter } from 'next/navigation';
import { ChevronsLeft } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ApiState from '@/components/ApiState';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const page = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const params = useParams();
  const router = useRouter();

  // API call to fetch user analytics data
  const {
    data: AnalyticsData,
    isLoading,
    error,
    isSuccess,
    isFetching,
  } = useGetUserAnalyticsQuery({
    id: params?.id,
    year: selectedYear
  }, {
    skip: !params?.id
  });

  // This will hold the chart data based on the selected year
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Total Jobs',
      data: [],
      fill: false,
      borderColor: '#DE3140',
      tension: 0.1,
    }],
  });

  useEffect(() => {
    if (AnalyticsData?.chart) {
      // Format the response data to fit the chart's data structure
      const labels = AnalyticsData.chart.map((item: any) => item.month); // months from API
      const data = AnalyticsData.chart.map((item: any) => item.total_jobs); // total jobs for each month

      setChartData({
        labels,
        datasets: [{
          label: `Jobs for ${selectedYear}`,
          data,
          fill: false,
          borderColor: '#DE3140',
          tension: 0.1,
        }],
      });
    }
  }, [AnalyticsData, selectedYear]);

  const handleYearChange: any = (date: Date) => {
    // Get the year from the selected date
    setSelectedYear(date.getFullYear());
  };

  const options: any = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Total Jobs for ${selectedYear}`,
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
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
    <div className="w-full p-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-white text-lg font-normal cursor-pointer"
      >
        <ChevronsLeft className="w-6 h-6 text-[#DE3140]" />
        <span>Back</span>
      </button>

      <h1 className="text-3xl font-medium text-white text-center">User Analytics</h1>

      {/* Available Credits Section */}
      <div className="w-full">
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
              <span className="text-[#8F9DAC] font-medium text-lg leading-[21px]">Total Jobs</span>
              <span className="text-white font-medium text-[40px] leading-[48px] tracking-[0.01rem]">
                {isLoading || isFetching
                  ? "fetching..."
                  : AnalyticsData?.total_jobs?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ApiState isSuccess={isSuccess} error={error}>
        <ApiState.Error />
        <ApiState.ArthorizeCheck />
      </ApiState>

      {/* Line Chart Section */}
      <div className="flex justify-between gap-8">
        <div className="w-full">
          <div className='flex justify-between'>
            <h2 className="text-2xl font-semibold mb-4 text-white">Total Jobs Performance</h2>
            {/* Calendar Year Selection */}
            <div className="mb-6 w-1/4">
              <label htmlFor="year" className="text-sm font-medium text-white">Select Year</label>
              <DatePicker
                selected={new Date(selectedYear, 0, 1)}  // Set date to the start of the selected year
                onChange={handleYearChange}
                dateFormat="yyyy"
                showYearPicker
                className="mt-2 w-full p-3 bg-[#1F2A39] text-white border border-[#D3D3D3] rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#DE3140] focus:border-transparent transition-all"
              />
            </div>
          </div>
          {isLoading || isFetching ? (
            <div className='flex justify-center items-center min-h-52'>
              <ProcessLoader />
            </div>
          ) : error ? (
            <div className="text-red-500">Error fetching data</div>
          ) : (
            <Line data={chartData} options={options} />
          )}
        </div>
      </div>

      {/* Job List */}
      <div>
        <JobList userId={params?.id} />
      </div>
    </div>
  );
};

export default page;
