import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Clock,
  BookOpen,
  FileText,
  Calendar,
  ChevronDownCircle,
  ChevronUpCircle,
  PlusCircle,
  Trash2,
} from 'lucide-react';

interface TeacherData {
  name: string;
  hoursTaught: number;
  coursesTaught: string[];
  papersGraded: number;
  currentSchedule: { date: Date; schedule: string }[];
}

interface TeacherPanelProps {
  initialData?: TeacherData;
  onDataUpdate?: (data: Partial<TeacherData>) => void;
  children?: React.ReactNode;
}

const TeacherPanel: React.FC<TeacherPanelProps> = ({
  initialData = {
    name: 'Jane Doe',
    hoursTaught: 120,
    coursesTaught: ['Math 101', 'Science 202', 'History 303'],
    currentSchedule: [
      { date: new Date(), schedule: 'Math 101 (9:00-11:00 AM)' },
    ],
    papersGraded: 200,
  },
  onDataUpdate,
}) => {
  const [teacherData, setTeacherData] = useState<TeacherData>(initialData);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...teacherData,
      [name]:
        name === 'hoursTaught' || name === 'papersGraded'
          ? Number(value)
          : value,
    };
    setTeacherData(updatedData);
    onDataUpdate?.(updatedData);
  };

  const addCourse = () => {
    const updatedData = {
      ...teacherData,
      coursesTaught: [...teacherData.coursesTaught, ''],
    };
    setTeacherData(updatedData);
    onDataUpdate?.(updatedData);
  };

  const deleteCourse = (index: number) => {
    const updatedData = {
      ...teacherData,
      coursesTaught: teacherData.coursesTaught.filter((_, i) => i !== index),
    };
    setTeacherData(updatedData);
    onDataUpdate?.(updatedData);
  };

  const addSchedule = () => {
    const updatedData = {
      ...teacherData,
      currentSchedule: [
        ...teacherData.currentSchedule,
        { date: new Date(), schedule: '' },
      ],
    };
    setTeacherData(updatedData);
    onDataUpdate?.(updatedData);
  };

  const deleteSchedule = (index: number) => {
    const updatedData = {
      ...teacherData,
      currentSchedule: teacherData.currentSchedule.filter(
        (_, i) => i !== index
      ),
    };
    setTeacherData(updatedData);
    onDataUpdate?.(updatedData);
  };

  const updateSchedule = (
    index: number,
    key: 'date' | 'schedule',
    value: Date | string
  ) => {
    const updatedSchedule = [...teacherData.currentSchedule];
    (updatedSchedule[index][key] as Date | string) = value;
    const updatedData = {
      ...teacherData,
      currentSchedule: updatedSchedule,
    };
    setTeacherData(updatedData);
    onDataUpdate?.(updatedData);
  };

  const getDayOfWeek = (date: Date) => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[date.getDay()];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Updated Teacher Data:', teacherData);
    onDataUpdate?.(teacherData);
    // alert('Teacher data updated!');
  };

  return (
    <div className="relative flex mb-8">
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded
            ? 'w-full h-full overflow-y-scroll max-h-80'
            : 'w-full h-20'
        } overflow-hidden`}
      >
        <div className="w-full rounded-xl bg-white shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Teacher Overview
              </h2>
              <input
                type="text"
                name="name"
                value={teacherData.name}
                onChange={handleChange}
                className="mt-1 text-sm text-gray-500 border rounded p-1"
              />
            </div>

            <div className="space-y-6 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-blue-50 p-4">
                  <div className="mb-2 flex items-center text-blue-500">
                    <Clock size={20} />
                  </div>
                  <input
                    type="number"
                    name="hoursTaught"
                    value={teacherData.hoursTaught}
                    onChange={handleChange}
                    placeholder="120"
                    className="text-2xl font-bold text-gray-900 border rounded p-1 w-full box-border"
                  />
                  <p className="text-sm text-gray-600">Hours Taught</p>
                </div>

                <div className="rounded-lg bg-green-50 p-4">
                  <div className="mb-2 flex items-center text-green-500">
                    <FileText size={20} />
                  </div>
                  <input
                    type="number"
                    name="papersGraded"
                    value={teacherData.papersGraded}
                    onChange={handleChange}
                    className="text-2xl font-bold text-gray-900 border rounded p-1 w-full box-border"
                  />
                  <p className="text-sm text-gray-600">Papers Graded</p>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <BookOpen size={20} className="text-purple-500" />
                  <h3 className="font-semibold text-gray-900">
                    Courses Taught
                  </h3>
                  <button
                    type="button"
                    onClick={addCourse}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <PlusCircle size={20} />
                  </button>
                </div>
                <div className="grid gap-2">
                  {teacherData.coursesTaught.map((course, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={course}
                        onChange={(e) => {
                          const updatedCourses = [...teacherData.coursesTaught];
                          updatedCourses[index] = e.target.value;
                          setTeacherData((prev) => ({
                            ...prev,
                            coursesTaught: updatedCourses,
                          }));
                        }}
                        className="rounded-lg bg-purple-50 px-3 py-2 text-sm text-gray-700 border w-full"
                      />
                      <button
                        type="button"
                        onClick={() => deleteCourse(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Calendar size={20} className="text-orange-500" />
                  <h3 className="font-semibold text-gray-900">
                    Weekly Schedule
                  </h3>
                  <button
                    type="button"
                    onClick={addSchedule}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <PlusCircle size={20} />
                  </button>
                </div>
                <div className="grid gap-2">
                  {teacherData.currentSchedule.map((entry, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <DatePicker
                        selected={entry.date}
                        onChange={(date) =>
                          updateSchedule(index, 'date', date as Date)
                        }
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="rounded-lg bg-orange-50 px-3 py-2 text-sm text-gray-700 border"
                      />
                      <input
                        type="text"
                        value={getDayOfWeek(entry.date)}
                        readOnly
                        className="rounded-lg bg-orange-50 px-3 py-2 text-sm text-gray-700 border"
                        placeholder="Day"
                      />
                      <input
                        type="text"
                        value={entry.schedule}
                        onChange={(e) =>
                          updateSchedule(index, 'schedule', e.target.value)
                        }
                        className="rounded-lg bg-orange-50 px-3 py-2 text-sm text-gray-700 border"
                        placeholder="Schedule"
                      />
                      <button
                        type="button"
                        onClick={() => deleteSchedule(index)}
                        className="text-red-500 hover:text-red-600 self-start mt-1"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6">
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute right-2 top-6 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform hover:bg-blue-600"
      >
        {isExpanded ? (
          <ChevronUpCircle size={20} />
        ) : (
          <ChevronDownCircle size={20} />
        )}
      </button>
    </div>
  );
};

export default TeacherPanel;
