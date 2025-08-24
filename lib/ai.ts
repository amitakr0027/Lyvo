import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type GenOpts = {
  transcript: string;
  meetingTitle: string;
  onToken?: (chunk: string) => void; // optional streaming callback
};

export async function generateMeetingSummary({ transcript, meetingTitle, onToken }: GenOpts) {
  if (!process.env.OPENAI_API_KEY) {
    // safe fallback if key missing
    return {
      summary: `Summary unavailable (no OPENAI_API_KEY). Meeting: ${meetingTitle}`,
      keyPoints: ["Set OPENAI_API_KEY to enable AI generation"],
      actionItems: 0,
      sentiment: "neutral" as const,
    };
  }

  // You can switch to responses API if you prefer; this uses chat.completions with streaming
  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini", // or any available model in your account
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that extracts concise meeting summaries. Return a short paragraph, 3-5 key points, number of action items, and overall sentiment (positive/neutral/negative).",
      },
      {
        role: "user",
        content: `Meeting Title: ${meetingTitle}\nTranscript:\n${transcript}`,
      },
    ],
  });

  let fullText = "";
  for await (const part of stream) {
    const token = part.choices?.[0]?.delta?.content ?? "";
    if (token) {
      fullText += token;
      onToken?.(token);
    }
  }

  const keyPoints = fullText
    .split("\n")
    .filter((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))
    .map((l) => l.replace(/^[-•]\s?/, "").trim())
    .slice(0, 5);

  const actionItemsMatch = fullText.match(/action items?:?\s*(\d+)/i);
  const sentimentMatch = fullText.match(/\b(positive|neutral|negative)\b/i);

  return {
    summary: fullText.slice(0, 1200), // cap to keep cards tidy
    keyPoints: keyPoints.length ? keyPoints : ["No explicit key points found"],
    actionItems: actionItemsMatch ? Number(actionItemsMatch[1]) : Math.max(0, keyPoints.length - 1),
    sentiment: (sentimentMatch?.[1]?.toLowerCase() ?? "neutral") as "positive" | "neutral" | "negative",
  };
}
