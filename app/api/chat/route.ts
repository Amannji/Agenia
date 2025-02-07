import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { tools } from "@/ai/tools";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    messages,
    temperature: 0.7,
    maxTokens: 500,
    system:
      "You are a helpful assistant that can answer questions and use tools to provide information. When you are invoking a tool, you should wait for the tool to return a result and not talk to the user until the tool has returned a result.",
    tools,
    maxSteps: 5,
  });
  return result.toDataStreamResponse();
}
