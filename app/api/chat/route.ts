// import { NextResponse } from "next/server";
// import { initializeAgent } from "@/lib/agent-setup";
// import { HumanMessage } from "@langchain/core/messages";
// import { streamText } from "ai";

// let agent: any = null;
// let agentConfig: any = null;

// // Initialize the agent once
// async function getAgent() {
//   if (!agent) {
//     const result = await initializeAgent();
//     agent = result.agent;
//     agentConfig = result.config;
//   }
//   return { agent, config: agentConfig };
// }

// // Handle initial agent setup
// export async function GET() {
//   try {
//     await getAgent();
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Failed to initialize agent:", error);
//     return NextResponse.json({ success: false }, { status: 500 });
//   }
// }

// // Handle chat messages
// export async function POST(req: Request) {
//   try {
//     const { agent, config } = await initializeAgent();
//     const { messages } = await req.json();
//     console.log("Latest User Prompt:", messages[messages.length - 1].content);

//     // Create a text stream using streamText
//     const textStream = streamText(() => {
//       const stream = await agent.stream(
//         {
//           messages: [new HumanMessage(messages[messages.length - 1].content)],
//         },
//         config
//       );

//       for await (const chunk of stream) {
//         if ("agent" in chunk) {
//           const text = chunk.agent.messages[0].content;
//           await onTextContent(text);
//         }
//       }
//     });

//     // Return the stream response
//     return textStream.toDataStreamResponse();
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { ChatOpenAI } from "@langchain/openai";
import { LangChainAdapter } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const model = new ChatOpenAI({
    modelName: "Meta-Llama-3-8B-Instruct-Q5_K_M",
    configuration: {
      baseURL: "http://localhost:8080/v1",
    },
  });

  const stream = await model.stream(prompt);

  return LangChainAdapter.toDataStreamResponse(stream);
}
