'use client';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../libs/firebase/firebaseSetup';
import React, { useState, KeyboardEvent } from 'react';
import Confetti from 'react-confetti';
import TeacherPanel from '../components/Panel';

interface TeacherData {
  name: string;
  hoursTaught: number;
  coursesTaught: string[];
  papersGraded: number;
  currentSchedule: { date: Date; schedule: string }[];
}

export default function ChatbotPage() {
  const [teacherData, setTeacherData] = useState<TeacherData>({
    name: 'Jane Doe',
    hoursTaught: 120,
    coursesTaught: ['Math 101', 'Science 202', 'History 303'],
    papersGraded: 200,
    currentSchedule: [
      { date: new Date(), schedule: 'Math 101 (9:00-11:00 AM)' },
    ],
  });

  const [userInput, setUserInput] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const handleTeacherDataUpdate = (updatedData: Partial<TeacherData>) => {
    setTeacherData((prev) => ({ ...prev, ...updatedData }));
  };

  const handleChat = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setResponse('');

    const fullPrompt = `
      You are assisting a teacher with the following data:
      - Name: ${teacherData.name}
      - Hours Taught: ${teacherData.hoursTaught}
      - Courses Taught: ${teacherData.coursesTaught.join(', ')}
      - Papers Graded: ${teacherData.papersGraded}
      - Schedule: ${JSON.stringify(
        teacherData.currentSchedule.map(
          (schedule) =>
            `${schedule.schedule} on ${schedule.date.toLocaleDateString()}`
        ),
        null,
        2
      )}

      Question: ${userInput}
    `;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      const data = await res.json();
      setResponse(data.message);
    } catch {
      setResponse('Error: Unable to fetch response from the chatbot.');
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async () => {
    if (!feedback.trim()) return;

    try {
      setLoading(true);

      const feedbackRef = collection(db, 'feedback');

      const data = {
        feedback: feedback.trim(),
        timestamp: new Date().toISOString(),
        userId: 'anonymous',
      };

      let retries = 3;
      while (retries > 0) {
        try {
          await addDoc(feedbackRef, data);
          setFeedbackSubmitted(true);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 10000);
          break;
        } catch (error) {
          retries--;
          if (retries === 0) throw error;
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert(
        'Failed to submit feedback. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

  return (
    <div className="min-h-screen bg-[#13141f] p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold text-white">
            Teacher Management Assistant
          </h1>
          <p className="text-white">
            Get instant insights about your teaching stats, schedule, and work
          </p>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          <TeacherPanel
            initialData={teacherData}
            onDataUpdate={handleTeacherDataUpdate}
          />
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Chat with the AI Assistant
            </h2>
          </div>

          <div className="space-y-4 p-6">
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-900 transition-colors placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="E.g., How many hours have I taught this week?"
              />
              <button
                onClick={handleChat}
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-500 hover:text-blue-500"
              >
                <span className="text-sm font-medium">Send</span>
              </button>
            </div>

            {loading && (
              <div className="text-center text-sm text-gray-500">
                Thinking...
              </div>
            )}

            {response && (
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-semibold text-gray-700">Response:</h3>
                <p className="text-gray-600">{response}</p>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Share Your Feedback
            </h2>
          </div>

          <div className="space-y-4 p-6">
            <textarea
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us about your experience with the chatbot..."
              rows={4}
              disabled={feedbackSubmitted}
            />
            <button
              onClick={handleFeedback}
              disabled={feedbackSubmitted}
              className={`rounded-lg px-6 py-2 font-medium text-white transition-colors ${
                feedbackSubmitted
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {showConfetti && <Confetti />}
              {feedbackSubmitted ? 'Feedback Submitted' : 'Submit Feedback'}
            </button>
            {feedbackSubmitted && (
              <div className="text-center text-sm text-green-600">
                Thank you for your feedback!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
