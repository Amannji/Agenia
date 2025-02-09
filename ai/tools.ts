import { tool as createTool } from "ai";
import { z } from "zod";

export const weatherTool = createTool({
  description: "Display the weather for a location",
  parameters: z.object({
    location: z.string().describe("The location to get the weather for"),
  }),
  execute: async function ({ location }) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { weather: "Sunny", temperature: 75, location };
  },
});
export const stockTool = createTool({
  description: "Get price for a stock",
  parameters: z.object({
    symbol: z.string().describe("The stock symbol to get the price for"),
  }),
  execute: async function ({ symbol }) {
    // Simulated API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { symbol, price: 100 };
  },
});

const tokenSchema = z.object({
  name: z.string(),
  address: z.string(),
  symbol: z.string(),
  decimals: z.number(),
  image: z.string().url(),
  chainId: z.number(),
});

export const buyTokenTool = createTool({
  description: "Buy a token",
  parameters: z.object({
    token: tokenSchema.describe("The token to buy"),
  }),
  execute: async function ({ token }) {
    return { token };
  },
});

export const tools = {
  displayWeather: weatherTool,
  getStockPrice: stockTool,
};
