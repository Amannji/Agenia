import { ChatOpenAI } from "@langchain/openai";
import { LangChainAdapter } from "ai";
import { HumanMessage } from "@langchain/core/messages";
import { initializeAgent } from "@/lib/agent-setup";

export const maxDuration = 60;

let agent: any = null;
let agentConfig: any = null;

async function getAgent() {
  if (!agent) {
    const result = await initializeAgent();
    agent = result.agent;
    agentConfig = result.config;
  }
  return { agent, config: agentConfig };
}

// export async function POST(req: Request) {
//   const { prompt } = await req.json();
//   const { agent, config } = await getAgent();
//   const stream = await agent.stream(
//     {
//       messages: [new HumanMessage(prompt)],
//     },
//     config
//   );
//   let content = "";
//   for await (const chunk of stream) {
//     if ("agent" in chunk) {
//       // console.log(chunk.agent.messages[0].content);
//       content += chunk.agent.messages[0].content;
//     } else if ("tools" in chunk) {
//       content += chunk.tools.messages[0].content;
//     }
//     console.log("-------------------");
//   }

//   // return LangChainAdapter.toDataStreamResponse(stream);
//   console.log(content);
//   return new Response(content);
// }

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const model = new ChatOpenAI({
    modelName: "llama70b",
    configuration: {
      baseURL: "https://llama70b.gaia.domains/v1",
    },
  });

  const stream = await model.stream(prompt);

  return LangChainAdapter.toDataStreamResponse(stream);
}
