'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { CourseNotFound } from '../../components/CourseNotFound';
import { Course } from '../../layouts/Course';
import { courseData } from '../../courses/data';
interface Course {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const courseDataTyped: Record<string, Course> = courseData;

export default function CoursePage() {
  const pathname = usePathname();
  const courseName = pathname?.split('/').pop() || '';
  const course = courseDataTyped[courseName];

  if (!course) {
    return <CourseNotFound />;
  }

  return (
    <Course
      title={course.title}
      subtitle={course.subtitle}
      description={course.description}
      image={course.image}
      courseName={course}
    />
  );
}
