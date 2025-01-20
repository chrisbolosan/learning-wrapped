export const generateFullPromptCourse = (
  courseName: string,
  audienceInput: string,
  sessionInput: string,
  userInput: string
): string => `
    You are assisting a teacher or student with the following data:
    - Course: ${courseName}
    - Audience Description: ${audienceInput}
    - Session Description Instructions: ${sessionInput}
  
    Question: ${userInput}
  `;

export const fetchChatResponse = async (
  prompt: string,
  setResponse: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  setLoading(true);
  setResponse('');

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await res.json();
    setResponse(data.message);
  } catch {
    setResponse('Error: Unable to fetch response from the chatbot.');
  } finally {
    setLoading(false);
  }
};
