import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const lookupTokenTool = tool(
  async ({ tokenName }: { tokenName: string }) => {
    const response = await fetch(
      `https://base.blockscout.com/api/v2/tokens?q=${tokenName}&type=ERC20`
    );
    const data = await response.json();
    return data.items[0].address;
  },
  {
    name: "lookupToken",
    description: "Lookup a token",
    schema: z.object({
      tokenName: z.string(),
    }),
  }
);

export const lookupTokenDetails = tool(
  async ({ tokenAddress }: { tokenAddress: string }) => {
    const response = await fetch(
      `https://base.blockscout.com/api/v2/tokens/${tokenAddress}`
    );
    const data = await response.json();
    return data;
  },
  {
    name: "lookupTokenDetails",
    description: "Lookup a token details",
    schema: z.object({
      tokenAddress: z.string(),
    }),
  }
);
