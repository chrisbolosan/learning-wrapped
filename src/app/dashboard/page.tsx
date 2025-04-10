'use client';

import React, { useEffect, useState } from 'react';
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
import { TeacherData } from '@/types/teacher';
import { TeacherStats, calculateTeacherStats } from '@/services/teacherService';
import { GradesChart } from './components/GradesChart';
import { CertificationCards } from './components/CertificationCards';

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
  const [teacherData] = useState<TeacherData>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('teacherData');
        if (saved) {
          const parsed = JSON.parse(saved);
          parsed.currentSchedule = parsed.currentSchedule.map(
            (s: { date: string; schedule: string }) => ({
              ...s,
              date: new Date(s.date),
            })
          );
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error loading teacher data:', error);
    }

    return {
      name: 'Jane Doe',
      hoursTaught: 120,
      coursesTaught: ['Math 101', 'Science 202', 'History 303'],
      papersGraded: 200,
      currentSchedule: [
        { date: new Date(), schedule: 'Math 101 (9:00-11:00 AM)' },
      ],
      grades: {},
    };
  });

  const [stats, setStats] = useState<TeacherStats | null>(null);
  const [selectedSemester, setSelectedSemester] = useState('Fall 2024');

  useEffect(() => {
    setStats(calculateTeacherStats(teacherData));
  }, [teacherData]);

  useEffect(() => {
    const saved = localStorage.getItem('teacherData');
    console.log('Saved data:', JSON.parse(saved || '{}'));
  }, []);

  if (!stats) return null;

  const transformData = () => {
    if (!stats) return null;

    const subjects = Object.keys(stats.lessonsCompleted);

    return {
      subjectData: {
        labels: subjects,
        datasets: [
          {
            data: subjects.map((subject) => stats.lessonsCompleted[subject]),
            backgroundColor: ['#4C6EF5', '#9775FA', '#FF6B6B', '#748FFC'],
            borderWidth: 0,
          },
        ],
      },
      weeklyData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: subjects.map((subject, index) => ({
          label: subject,
          data: Object.values(stats.weeklyActivity[subject]),
          borderColor: ['#4C6EF5', '#9775FA', '#FF6B6B', '#748FFC'][index],
          backgroundColor: [
            `rgba(76, 110, 245, 0.1)`,
            `rgba(151, 117, 250, 0.1)`,
            `rgba(255, 107, 107, 0.1)`,
            `rgba(116, 143, 252, 0.1)`,
          ][index],
          fill: true,
          tension: 0.4,
        })),
      },
    };
  };

  const chartData = transformData();
  if (!chartData || !stats) return null;

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
                data={chartData.subjectData}
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
                data={chartData.subjectData}
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
              data={chartData.weeklyData}
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
            <h2 className="text-xl font-semibold text-white">Course Grades</h2>
            <select
              className="bg-[#13141f] text-white px-3 py-1 rounded"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="Fall 2024">Fall 2024</option>
              <option value="Spring 2024">Spring 2024</option>
            </select>
          </div>
          <div className="h-[300px]">
            <GradesChart stats={stats} selectedSemester={selectedSemester} />
          </div>
        </div>

        <div className="bg-[#1a1b26] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Certifications and Rewards
            </h2>
          </div>
          <CertificationCards certifications={stats.certifications} />
        </div>
      </div>
    </div>
  );
}
