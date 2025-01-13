'use client';

import React, { useState } from 'react';

const teacherData = {
  name: 'Jane Doe',
  hoursTaught: 120,
  coursesTaught: ['Math 101', 'Science 202', 'History 303'],
  papersGraded: 200,
  currentSchedule: {
    Monday: 'Math 101 (9:00-11:00 AM)',
    Wednesday: 'Science 202 (10:00-12:00 PM)',
    Friday: 'History 303 (1:00-3:00 PM)',
  },
};

export default function ChatbotPage() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

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
      - Schedule: ${JSON.stringify(teacherData.currentSchedule, null, 2)}

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

  const handleFeedback = () => {
    if (!feedback.trim()) return;
    setFeedbackSubmitted(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Teacher Management Assistant
          </h1>
          <p className="text-gray-600">
            Get instant insights about your teaching stats, schedule, and work
          </p>
        </div>

        {/* Chat Section */}
        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Chat with the Assistant
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

        {/* Feedback Section */}
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
            />
            <button
              onClick={handleFeedback}
              className="rounded-lg bg-blue-500 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Feedback
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
