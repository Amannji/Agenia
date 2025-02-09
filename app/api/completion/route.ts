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

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const { text } = await generateText({
    model: openai("gpt-4"),
    system:
      "Based on the user's message, generate a list of 5 contextual prompts that are relevant to the user's message. Mark it down as a list of strings.",
    prompt,
    maxSteps: 2,
    maxTokens: 500,
  });

  return Response.json({ text });
}
