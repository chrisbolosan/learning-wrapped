'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '../../components/Navigationbar';
import { ArrowLeft, Star, Share2, Rocket, Plus } from 'lucide-react';
import Link from 'next/link';
import { courseData } from '../../courses/data';

export default function CoursePage<>() {
  const pathname = usePathname();
  const courseName = pathname.split('/').pop();
  const course = courseData[courseName];

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
        <Navbar />
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold">Course Not Found</h1>
          <p className="mt-4 text-gray-400">
            We couldn't find the course you're looking for.
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
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/spaces">
          <button className="flex items-center text-purple-400 mb-6 hover:text-purple-300 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-semibold mb-1">{course.title}</h1>
                <p className="text-gray-400">{course.subtitle}</p>
              </div>
            </div>

            <p className="text-gray-300 mb-8">{course.description}</p>

            <div className="bg-gray-800/70 rounded-lg p-4 mb-6">
              {/* <button className="flex items-center justify-between w-full text-left mb-4">
                <span className="text-lg font-medium">More Options</span>
              </button> */}

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2">
                    Audience Description
                  </label>
                  <textarea
                    className="w-full bg-gray-700/50 rounded-lg p-3 text-gray-300 placeholder-gray-500"
                    placeholder="Describe the target audience. Give as much detail as you'd like to better adapt the exercise to your audience."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">
                    Session Instructions
                  </label>
                  <textarea
                    className="w-full bg-gray-700/50 rounded-lg p-3 text-gray-300 placeholder-gray-500"
                    placeholder="Describe any specific session instructions that can be applied before sharing with students."
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                Launch
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-300 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                <Star className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-300 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl flex flex-col">
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
              <h2 className="text-xl font-semibold">Preview</h2>
              <button className="p-2 hover:bg-gray-700/50 rounded-full transition-colors">
                <Rocket className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 bg-gray-900/50 min-h-[500px]">
              {/* preview logic lorem ipsum logic */}
            </div>

            <div className="border-t border-gray-700 p-4 flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <Plus className="w-4 h-4" />
                Actions
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Send a message"
                  className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-gray-300 placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
