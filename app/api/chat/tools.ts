import { tool as createTool } from "ai";
import { generateResponse } from "@/lib/agents/Coinbase/cdpAgent";
import { z } from "zod";

const promptCDP = createTool({
  description: "Use this tool to get the response from the cdp agent",
  parameters: z.object({
    userInput: z.string(),
  }),
  execute: async ({ userInput }) => {
    const response = await generateResponse(userInput);
    return response;
  },
});

const swapTokens = createTool({
  description: "Swap tokens",
  parameters: z.object({
    from: z.string().describe("The token to swap from"),
    to: z.string().describe("The token to swap to"),
  }),
  execute: async function ({ from, to }) {
    return { from, to };
  },
});

export const buyTokenTool = createTool({
  description: "Buy a token",
  parameters: z.object({
    token: z.string().describe("The token to buy"),
  }),
  execute: async function ({ token }) {
    return { token };
  },
});

export const tools = {
  askCDP: promptCDP,
  swapTokens: swapTokens,
  buyToken: buyTokenTool,
};
