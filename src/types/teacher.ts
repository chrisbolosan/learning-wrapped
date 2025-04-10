export interface TeacherData {
  name: string;
  hoursTaught: number;
  coursesTaught: string[];
  papersGraded: number;
  currentSchedule: { date: Date; schedule: string }[];
  grades: {
    [subject: string]: {
      [semester: string]: number;
    };
  };
}
