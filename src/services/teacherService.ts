import { TeacherData } from '@/types/teacher';

export interface TeacherStats {
  lessonsCompleted: { [subject: string]: number };
  quizzesCompleted: { [subject: string]: number };
  weeklyActivity: {
    [subject: string]: { [day: string]: number };
  };
  grades: {
    [subject: string]: { [semester: string]: number };
  };
  certifications: Array<{
    id: string;
    title: string;
    date: string;
    type: string;
  }>;
}

export const calculateTeacherStats = (
  teacherData: TeacherData
): TeacherStats => {
  const subjects = teacherData.coursesTaught;

  return {
    lessonsCompleted: subjects.reduce(
      (acc, subject) => ({
        ...acc,
        [subject]: Math.floor(teacherData.hoursTaught / subjects.length),
      }),
      {}
    ),

    quizzesCompleted: subjects.reduce(
      (acc, subject) => ({
        ...acc,
        [subject]: Math.floor(teacherData.papersGraded / subjects.length),
      }),
      {}
    ),

    weeklyActivity: subjects.reduce(
      (acc, subject) => ({
        ...acc,
        [subject]: {
          Mon: 4,
          Tue: 3,
          Wed: 5,
          Thu: 2,
          Fri: 3,
        },
      }),
      {}
    ),

    grades: teacherData.grades,

    certifications: [
      {
        id: '1',
        title: 'Advanced Teaching',
        date: '2024',
        type: 'Professional',
      },
      {
        id: '2',
        title: 'STEM Education',
        date: '2024',
        type: 'Subject Matter',
      },
    ],
  };
};
