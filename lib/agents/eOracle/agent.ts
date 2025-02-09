import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { HumanMessage } from "@langchain/core/messages";
import { createPublicClient, http } from "viem";
import baseSepolia from "viem/chains/base-sepolia";
import { abi } from "./abi.json";

const feedAddress = "";

const getPriceTool = tool(async ({ token }) => {}, {
  name: "getPrice",
  description: "Get the price of a token",
  schema: z.object({
    token: z.string(),
  }),
});

async function initializeAgent() {
  const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
  });

  const tools = [getPriceTool];

  const agentConfig = {
    configurable: { thread_id: "eOracle Agent" },
  };
  const agent = createReactAgent({
    llm,
    tools,
    messageModifier:
      "You are a helpful agent which has access to eOracle price feeds. You use tools to get the price of a token.",
  });

  return { agent, config: agentConfig };
}

export async function generateResponse(userInput: string) {
  const { agent, config } = await initializeAgent();
  const response = await agent.invoke(
    { messages: [new HumanMessage(userInput)] },
    config
  );
  return response;
}
