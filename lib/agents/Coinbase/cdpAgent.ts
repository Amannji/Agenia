// These imports are failing because the packages are not installed or don't exist:
// - @coinbase/agentkit-langchain
// - @langchain/langgraph
// - @langchain/langgraph/prebuilt
// - @langchain/anthropic

// Only this import seems to work:

import {
  AgentKit,
  wethActionProvider,
  walletActionProvider,
  erc20ActionProvider,
  cdpApiActionProvider,
  cdpWalletActionProvider,
  pythActionProvider,
  ViemWalletProvider,
} from "@coinbase/agentkit";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { getLangChainTools } from "@coinbase/agentkit-langchain";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";

import { ChatOpenAI } from "@langchain/openai";
// import { calculatorTool, dnsLookupTool } from "./tools";

// import {
//   ChatPromptTemplate,
//   MessagesPlaceholder,
// } from "@langchain/core/prompts";
// import { StateGraph } from "@langchain/langgraph";
// import { Annotation } from "@langchain/langgraph";
// import { createWalletClient, http } from "viem";
// import { privateKeyToAccount } from "viem/accounts";
// import { baseSepolia } from "viem/chains";

import * as dotenv from "dotenv";

import { HumanMessage } from "@langchain/core/messages";

dotenv.config();

function validateEnvironment(): void {
  const missingVars: string[] = [];

  // Check required variables
  const requiredVars = [
    "OPENAI_API_KEY",
    "CDP_API_KEY_NAME",
    "CDP_API_KEY_PRIVATE_KEY",
  ];
  requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  });

  // Exit if any required variables are missing
  if (missingVars.length > 0) {
    console.error("Error: Required environment variables are not set");
    missingVars.forEach((varName) => {
      console.error(`${varName}=your_${varName.toLowerCase()}_here`);
    });
    process.exit(1);
  }

  // Warn about optional NETWORK_ID
  if (!process.env.NETWORK_ID) {
    console.warn(
      "Warning: NETWORK_ID not set, defaulting to base-sepolia testnet"
    );
  }
}

validateEnvironment();
// const WALLET_DATA_FILE = "wallet_data.txt";

async function initializeAgent() {
  try {
    // Initialize LLM
    const llm = new ChatOpenAI({
      model: "gpt-3.5-turbo",
    });

    // Read existing wallet data if available
    // if (fs.existsSync(WALLET_DATA_FILE)) {
    //   try {
    //     walletDataStr = fs.readFileSync(WALLET_DATA_FILE, "utf8");
    //   } catch (error) {
    //     console.error("Error reading wallet data:", error);
    //     // Continue without wallet data
    //   }
    // }

    // Configure CDP Wallet Provider
    // const config = {
    //   apiKeyName: process.env.CDP_API_KEY_NAME,
    //   apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(
    //     /\\n/g,
    //     "\n"
    //   ),
    //   cdpWalletData: undefined,
    //   networkId: process.env.NETWORK_ID || "base-sepolia",
    // };

    const account = privateKeyToAccount(
      "0x24dd5f3aae7074ac9e1372e382ed36d6efe5486451f459d3bdf35ca0f0e249fd"
    );
    // const walletProvider = await CdpWalletProvider.configureWithWallet(config);

    const client = createWalletClient({
      account,
      chain: baseSepolia,
      transport: http(),
    });

    // // Create a wallet provider that AgentKit can use
    const walletProvider = new ViemWalletProvider(client);

    // Initialize AgentKit
    const agentkit = await AgentKit.from({
      walletProvider,
      actionProviders: [
        wethActionProvider(),
        pythActionProvider(),
        walletActionProvider(),
        erc20ActionProvider(),
        cdpApiActionProvider({
          apiKeyName: process.env.CDP_API_KEY_NAME,
          apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(
            /\\n/g,
            "\n"
          ),
        }),
        cdpWalletActionProvider({
          apiKeyName: process.env.CDP_API_KEY_NAME,
          apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(
            /\\n/g,
            "\n"
          ),
        }),
      ],
    });

    const tools = await getLangChainTools(agentkit);
    // const tools = [
    //   dnsLookupTool,
    //   calculatorTool,
    //   ...(await getLangChainTools(agentkit)),
    // ];

    // Store buffered conversation history in memory
    const memory = new MemorySaver();
    const agentConfig = {
      configurable: { thread_id: "CDP AgentKit Chatbot Example!" },
    };

    // Create React Agent using the LLM and CDP AgentKit tools
    const agent = createReactAgent({
      llm,
      tools,
      checkpointSaver: memory,
      messageModifier: `
        You are a helpful agent that can interact onchain using the Coinbase Developer Platform AgentKit. You are 
        empowered to interact onchain using your tools. If you ever need funds, you can request them from the 
        faucet if you are on network ID 'base-sepolia'. If not, you can provide your wallet details and request 
        funds from the user. Before executing your first action, get the wallet details to see what network 
        you're on. If there is a 5XX (internal) HTTP error code, ask the user to try again later. If someone 
        asks you to do something you can't do with your currently available tools, you must say so, and 
        encourage them to implement it themselves using the CDP SDK + Agentkit, recommend they go to 
        docs.cdp.coinbase.com for more information. Be concise and helpful with your responses. Refrain from 
        restating your tools' descriptions unless it is explicitly requested.
        `,
    });

    // Save wallet data
    // const exportedWallet = await walletProvider.exportWallet();
    // fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify(exportedWallet));

    return { agent, config: agentConfig };
  } catch (error) {
    console.error("Failed to initialize agent:", error);
    throw error; // Re-throw to be handled by caller
  }
}

/**
 * Run the agent interactively based on user input
 */
// async function runChatMode(agent: any, config: any) {
//   console.log("Starting chat mode... Type 'exit' to end.");

//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   const question = (prompt: string): Promise<string> =>
//     new Promise((resolve) => rl.question(prompt, resolve));

//   try {
//     while (true) {
//       const userInput = await question("\nPrompt: ");

//       if (userInput.toLowerCase() === "exit") {
//         break;
//       }

//       const stream = await agent.stream(
//         { messages: [new HumanMessage(userInput)] },
//         config
//       );

//       for await (const chunk of stream) {
//         if ("agent" in chunk) {
//           console.log(chunk.agent.messages[0].content);
//         } else if ("tools" in chunk) {
//           console.log(chunk.tools.messages[0].content);
//         }
//         console.log("-------------------");
//       }
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error:", error.message);
//     }
//     process.exit(1);
//   } finally {
//     rl.close();
//   }
// }

// async function main() {
//   const { agent, config } = await initializeAgent();
//   const response = await agent.invoke(
//     {
//       messages: [
//         {
//           role: "user",
//           content: "What is my wallet address?",
//         },
//       ],
//     },
//     config
//   );
//   console.log(response);
// }

// main();

export async function generateResponse(userInput: string) {
  const { agent, config } = await initializeAgent();
  const response = await agent.invoke(
    { messages: [new HumanMessage(userInput)] },
    config
  );
  return response;
}
