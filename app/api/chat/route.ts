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

// import { ChatOpenAI } from "@langchain/openai";
// import { LangChainAdapter } from "ai";
// import { tool } from "@langchain/core/tools";
// import { z } from "zod";
// export const maxDuration = 60;

// export async function POST(req: Request) {
//   const { prompt } = await req.json();

//   const getStockPrice = tool(
//     async ({ symbol }) => {
//       console.log("Stock price tool called");
//       return { symbol, price: 100 };
//     },
//     {
//       name: "getStockPrice",
//       description: "Get the price of a stock",
//       schema: z.object({
//         symbol: z.string().describe("The stock symbol to get the price for"),
//       }),
//     }
//   );

//   const tools = [getStockPrice];

//   const model = new ChatOpenAI({
//     modelName: "llama70b",
//     configuration: {
//       baseURL: "https://llama70b.gaia.domains/v1",
//     },
//   }).bindTools(tools);

//   const stream = await model.stream(prompt);

//   return LangChainAdapter.toDataStreamResponse(stream);
// }
