import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
// import { tools } from "@/ai/tools";
import z from "zod";
// import { tool } from "@langchain/core/tools";
import { generateResponse } from "@/lib/agents/Coinbase/cdpAgent";

// const cdpTool = tool(
//   async ({ userInput }: { userInput: string }) => {
//     const response = await generateResponse(userInput);
//     return response;
//   },
//   {
//     name: "askCDP",
//     description: "Use this tool to get the response from the cdp agent",
//     parameters: z.object({
//       userInput: z.string(),
//     }),
//   }
// );

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    messages,
    temperature: 0.7,
    maxTokens: 500,
    system: `You are a helpful assistant that works with a CDP agent. 
    When users ask about CDPs or want to perform CDP operations, use the askCDPAgent tool to handle their request.
    The CDP agent is capable of understanding user intent and performing the necessary actions. You make use of eOracle tool to get the price of a token/USD.`,
    tools: {
      askCDP: {
        description: "Use this tool to get the response from the cdp agent",
        parameters: z.object({
          userInput: z.string(),
        }),
        execute: async ({ userInput }) => {
          const response = await generateResponse(userInput);
          return response;
        },
      },
      askeOracle: {
        description:
          "Use this tool, when user ask about the price of a token in USD",
        parameters: z.object({
          token: z.string(),
        }),

        execute: async ({ token }) => {
          const response = await generateResponse(token);
          return `eOracle: ${response}`;
        },
        prompt: `What is the price of ETH/USD?`,
      },
    },
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
