import React, { useState } from 'react';
import { ArrowLeft, Star, Share2, Plus, Rocket } from 'lucide-react';
import Link from 'next/link';

interface CourseProps {
  courseName: string;
  image: string;
  title: string;
  description: string;
  subtitle: string;
  audienceInput?: string;
  sessionInput?: string;
  userInput?: string;
}

export const Course: React.FC<CourseProps> = ({
  courseName,
  image,
  title,
  subtitle,
  description,
}) => {
  const [audienceInput, setAudienceInput] = useState('');
  const [sessionInput, setSessionInput] = useState('');
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleChat = async () => {
    // if (!userInput.trim()) return;

    setLoading(true);
    setResponse('');

    const fullPrompt = `
      You are assisting a teacher with the following data:
      - Name: 'Jane Doe'
      - Hours Taught: 120
      - Course: ${courseName}
      - Audience Description: ${audienceInput}
      -Session Description Iånstructions: ${audienceInput}

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
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

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
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                  onChange={(e) => setAudienceInput(e.target.value)}
                />
              </div>
              <div>
                <h1 className="text-2xl font-semibold mb-1">{title}</h1>
                <p className="text-gray-400">{subtitle}</p>
              </div>
            </div>

            <p className="text-gray-300 mb-8">{description}</p>

            <div className="bg-gray-800/70 rounded-lg p-4 mb-6">
              <button className="flex items-center justify-between w-full text-left mb-4">
                <span className="text-lg font-medium">More Options</span>
              </button>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2">
                    Audience Description
                  </label>
                  <textarea
                    className="w-full bg-gray-700/50 rounded-lg p-3 text-gray-300 placeholder-gray-500"
                    placeholder="Describe the target audience. Give as much detail as you'd like to better adapt the exercise to your audience."
                    rows={4}
                    value={audienceInput}
                    onChange={(e) => setAudienceInput(e.target.value)}
                    onKeyDown={handleKeyPress}
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
                    value={sessionInput}
                    onChange={(e) => setSessionInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleChat}
                disabled={loading}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Launch
              </button>
              {/* <button className="p-2 text-gray-400 hover:text-gray-300 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                <Star className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-300 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button> */}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl flex flex-col">
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
              <h2 className="text-xl font-semibold">Preview</h2>
              <button className="p-2 hover:bg-gray-700/50 rounded-full transition-colors">
                <Rocket className="w-5 h-5" />
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
            <div className="flex-1 bg-gray-900/50 min-h-[500px]"></div>
            <div className="border-t border-gray-700 p-4 flex items-center gap-4">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                onClick={handleChat}
              >
                {/* <Plus className="w-4 h-4" /> */}
                Send
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Send a message"
                  className="w-full px-4 py-2 bg-gray-700/50 rounded-lg text-gray-300 placeholder-gray-500"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
