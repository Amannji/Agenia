import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: openai("gpt-4-turbo"),
    messages,
    temperature: 0.7,
    maxTokens: 500,
  });
  return result.toDataStreamResponse();
}
