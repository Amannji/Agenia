import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { tools } from "./tools";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    messages,
    temperature: 0.7,
    maxTokens: 500,
    system: `You are a super assistant that acts as a orchestrator for different agents. For any blockchain related queries, you should invoke the askCDP tool. When you are asked to swap tokens, you invoke the swapTokens tool.`,
    tools: tools,
    toolChoice: "auto",
    maxSteps: 5,
  });
  return result.toDataStreamResponse();
}
