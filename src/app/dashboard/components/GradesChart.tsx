'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TeacherStats } from '@/services/teacherService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface GradesChartProps {
  stats: TeacherStats;
  selectedSemester: string;
}

export function GradesChart({ stats, selectedSemester }: GradesChartProps) {
  const subjects = Object.keys(stats.grades);
  const grades = subjects.map(
    (subject) => stats.grades[subject]?.[selectedSemester] ?? 0
  );

  const data = {
    labels: subjects,
    datasets: [
      {
        label: selectedSemester,
        data: grades,
        backgroundColor: '#4C6EF5',
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
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
  };

  return <Bar data={data} options={options} />;
}
