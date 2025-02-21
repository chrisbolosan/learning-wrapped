'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const subjectData = {
    labels: ['Math', 'Science', 'History', 'English'],
    datasets: [
      {
        data: [30, 25, 20, 25],
        backgroundColor: ['#4C6EF5', '#9775FA', '#FF6B6B', '#748FFC'],
        borderWidth: 0,
      },
    ],
  };

  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Math',
        data: [4, 3, 5, 2, 3],
        borderColor: '#4C6EF5',
        backgroundColor: 'rgba(76, 110, 245, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Science',
        data: [2, 4, 3, 5, 4],
        borderColor: '#9775FA',
        backgroundColor: 'rgba(151, 117, 250, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'English',
        data: [3, 2, 4, 3, 5],
        borderColor: '#748FFC',
        backgroundColor: 'rgba(116, 143, 252, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'History',
        data: [5, 3, 2, 4, 3],
        borderColor: '#FF6B6B',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#13141f] p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Progress Tracker</h1>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1a1b26] rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Lessons Completed
            </h2>
            <div className="h-[300px]">
              <Doughnut
                data={subjectData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: { color: 'white' },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-[#1a1b26] rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Quizzes Completed
            </h2>
            <div className="h-[300px]">
              <Doughnut
                data={subjectData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: { color: 'white' },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-[#1a1b26] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Learning Patterns
            </h2>
            <div className="flex gap-4">
              <select className="bg-[#13141f] text-white px-3 py-1 rounded">
                <option>MATH</option>
                <option>SCIENCE</option>
                <option>ENGLISH</option>
                <option>HISTORY</option>
              </select>
              <select className="bg-[#13141f] text-white px-3 py-1 rounded">
                <option>WEEKLY</option>
                <option>MONTHLY</option>
                <option>YEARLY</option>
              </select>
            </div>
          </div>
          <div className="h-[400px]">
            <Line
              data={weeklyData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: 'white' },
                  },
                  x: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: 'white' },
                  },
                },
                plugins: {
                  legend: {
                    labels: { color: 'white' },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-[#1a1b26] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Fall 2024 Grades
            </h2>
            <select className="bg-[#13141f] text-white px-3 py-1 rounded">
              <option>FALL 2024</option>
              <option>SPRING 2024</option>
            </select>
          </div>
          {/* grades visuals here  */}
        </div>

        <div className="bg-[#1a1b26] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Certifications and Rewards
            </h2>
            <select className="bg-[#13141f] text-white px-3 py-1 rounded">
              <option>3 SEMESTERS</option>
              <option>2 SEMESTERS</option>
              <option>1 SEMESTER</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* certs here */}
          </div>
        </div>
      </div>
    </div>
  );
}
