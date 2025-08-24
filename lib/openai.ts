// lib/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateMeetingSummary(transcript: string, meetingTitle: string): Promise<{
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
}> {
  try {
    const prompt = `
      Analyze the following meeting transcript and generate:
      1. A comprehensive summary (2-3 paragraphs)
      2. 3-5 key points as bullet points
      3. 2-4 action items as bullet points
      4. Sentiment analysis (positive, neutral, or negative)

      Meeting Title: ${meetingTitle}
      Transcript: ${transcript}

      Return the response as a JSON object with this structure:
      {
        "summary": "string",
        "keyPoints": ["string1", "string2", ...],
        "actionItems": ["string1", "string2", ...],
        "sentiment": "positive|neutral|negative"
      }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert at analyzing meeting transcripts and generating structured summaries. Always return valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const result = JSON.parse(response);
    
    return {
      summary: result.summary,
      keyPoints: result.keyPoints,
      actionItems: result.actionItems,
      sentiment: result.sentiment
    };
  } catch (error) {
    console.error('Error generating meeting summary:', error);
    throw new Error('Failed to generate meeting summary');
  }
}