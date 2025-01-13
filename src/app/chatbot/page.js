'use client';

import { useState } from 'react';

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

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>📚 Teacher Management Chatbot</h1>
      <p>
        Ask the chatbot about your teaching stats, schedule, or anything related
        to your work!
      </p>

      <div style={{ marginBottom: '20px' }}>
        <h2>💬 Chat with the Assistant</h2>
        <input
          type="text"
          className="text-black w-full p-3 mb-3 text-base"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="E.g., How many hours have I taught this week?"
        />
        <button
          onClick={handleChat}
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </div>

      {response && (
        <div>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}

      <div style={{ marginTop: '40px' }}>
        <h2>🌟 Feedback</h2>
        <textarea
          className="text-black w-full p-3 mb-3 text-base"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your feedback about the chatbot!"
          style={{
            width: '100%',
            height: '80px',
            padding: '10px',
            fontSize: '16px',
          }}
        />
        <br />
        <button
          onClick={handleFeedback}
          style={{ padding: '10px 20px', marginTop: '10px' }}
        >
          Submit Feedback
        </button>
        {feedbackSubmitted && <p>Thank you for your feedback!</p>}
      </div>
    </div>
  );
}
