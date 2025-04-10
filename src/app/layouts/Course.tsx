import React, { useState } from 'react';
import {
  ArrowLeft,
  // Star,
  // Share2,
  //  Plus,
  Rocket,
} from 'lucide-react';
import Link from 'next/link';
import { validateCourseInputs } from '@utilscripts/Validations';
import {
  generateFullPromptCourse,
  fetchChatResponse,
} from '@utilprompts/Prompts';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { ResponsePdf } from '../components/ResponsePdf';
import { generatePDFFileName } from '@utilscripts/SanitizeFile';

interface CourseProps {
  courseName: string;
  image: string;
  title: string;
  description: string;
  subtitle: string;
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
  const [error, setError] = useState({
    sessionInput: '',
    audienceInput: '',
  });

  const fileName = generatePDFFileName(courseName, audienceInput);

  const handleChat = async () => {
    const validation = validateCourseInputs({ sessionInput, audienceInput });

    if (!validation.isValid) {
      setError(validation.errors);
      return;
    }

    setError({
      sessionInput: '',
      audienceInput: '',
    });

    setLoading(true);
    setResponse('');

    const fullPrompt = generateFullPromptCourse(
      courseName,
      audienceInput,
      sessionInput,
      userInput
    );

    await fetchChatResponse(fullPrompt, setResponse, setLoading);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
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
          <div className="bg-gray-800/50 rounded-xl p-6 flex-1 max-h-fit">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-semibold mb-1">{title}</h1>
                <p className="text-gray-400">{subtitle}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-8">{description}</p>

            <div className="bg-gray-800/70 rounded-lg p-4 mb-6 space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">
                  Audience Description
                </label>
                <textarea
                  className="w-full bg-gray-700/50 rounded-lg p-3 text-gray-300 placeholder-gray-500"
                  placeholder="Describe the target audience. Give as much detail as you’d like to better adapt the exercise to your audience."
                  rows={4}
                  value={audienceInput}
                  onChange={(e) => setAudienceInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                {error.audienceInput && (
                  <p className="text-red-500 text-sm mt-1">
                    {error.audienceInput}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-400 mb-2">
                  Session Instructions
                </label>
                <textarea
                  className="w-full bg-gray-700/50 rounded-lg p-3 text-gray-300 placeholder-gray-500"
                  placeholder="Describe session instructions."
                  rows={4}
                  value={sessionInput}
                  onChange={(e) => setSessionInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                {error.sessionInput && (
                  <p className="text-red-500 text-sm mt-1">
                    {error.sessionInput}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {/* <button className="p-2 text-gray-400 hover:text-gray-300 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                <Star className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-300 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button> */}

              <button
                onClick={handleChat}
                disabled={loading}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Launch
              </button>
              {response && (
                <PDFDownloadLink
                  document={
                    <ResponsePdf
                      courseName={courseName}
                      audienceInput={audienceInput}
                      sessionInput={sessionInput}
                      response={response}
                    />
                  }
                  fileName={fileName}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Download as PDF
                </PDFDownloadLink>
              )}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl flex flex-col overflow-hidden justify-between">
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
              <h2 className="text-xl font-semibold">Preview</h2>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">AI-Enhanced</span>
                <Rocket className="w-5 h-5" />
              </div>
            </div>
            {loading && (
              <div className="text-center text-sm text-gray-500">
                Thinking...
              </div>
            )}
            {response && (
              <div className="rounded-lg bg-gray-50 p-4 overflow-y-scroll !max-h-[600px]">
                <h3 className="mb-2 font-semibold text-gray-700">Response:</h3>
                {/* <p className="text-gray-600">{response}</p> */}

                <React.Fragment>
                  <JsonView
                    data={response}
                    shouldExpandNode={allExpanded}
                    style={defaultStyles}
                  />
                </React.Fragment>
              </div>
            )}
            <div className="max-h-fit flex-1 bg-gray-900/50"></div>
            <div className="border-t border-gray-700 p-4 flex items-center gap-4">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                onClick={handleChat}
              >
                {' '}
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
