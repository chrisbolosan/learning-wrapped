import Link from 'next/link';
import React from 'react';

export const CourseNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      {/* <Navbar /> */}
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl font-bold">Course Not Found</h1>
        <p className="mt-4 text-gray-400">
          We couldn&apos;t find the course you&apos;re looking for.
        </p>
        <Link
          href="/spaces"
          className="text-purple-500 hover:underline mt-6 block"
        >
          Go Back to All Courses
        </Link>
      </div>
    </div>
  );
};

export default CourseNotFound;
