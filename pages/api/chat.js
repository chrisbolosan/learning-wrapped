import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-002' });

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const aiResponseText = response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (aiResponseText) {
      return res.status(200).json({ message: aiResponseText });
    } else {
      console.error(
        'Failed to extract AI response text:',
        JSON.stringify(response, null, 2)
      );
      return res
        .status(500)
        .json({ error: 'Failed to extract AI response text' });
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return res.status(500).json({
      error: 'Failed to fetch Generative AI response',
      details: error.message,
    });
  }
}
