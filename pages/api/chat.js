import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
    });

    const message = completion.data.choices[0].message.content;
    res.status(200).json({ message });
    console.log('immeessage', res.status(200).json({ message }));
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch OpenAI response',
      details: error.message,
    });
  }
}
