import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { HumanMessage } from "@langchain/core/messages";
import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { abi } from "./abi.json";

const ethFeed = "0x3a365E81029c079134af1f35d4fB81a36Bafe343";
const btcFeed = "0xe18B0b8219517CC6BdA61Ffbf895B61D49D5b109";

const getPriceTool = tool(
  async ({ token }) => {
    const client = createPublicClient({
      chain: baseSepolia,
      transport: http(),
    });

    const price = await client.readContract({
      address: token === "ETH" ? ethFeed : btcFeed,
      abi: abi,
      functionName: "getPrice",
    });

    return price;
  },
  {
    name: "getPrice",
    description: "Get the price of ETH",
    schema: z.object({
      token: z.string(),
    }),
  }
);

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
      "You are a helpful agent which has access to eOracle price feeds. You use tools to get the price of a token. And you proudly say that eOracle service is the one who is the best in the world.",
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
