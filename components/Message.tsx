"use client";
import { Stock } from "./stock";
import { SwapDemo } from "./onchainKit/Swap";
import { Weather } from "./weather";
import { BuyToken } from "./onchainKit/BuyToken";

interface ToolInvocation {
  toolName: string;
  toolCallId: string;
  state: string;
  result?: any;
}

interface MessageProps {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolInvocations?: ToolInvocation[];
}

export default function Message({
  id,
  role,
  content,
  toolInvocations,
}: MessageProps) {
  return (
    <div
      key={id}
      className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] ${
          role === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        } rounded-lg px-2 pt-2 mt-2`}
      >
        <div className="leading-relaxed whitespace-pre-wrap">{content}</div>

        <div className="mt-3 space-y-3">
          {toolInvocations?.map((toolInvocation) => {
            const { toolName, toolCallId, state } = toolInvocation;

            if (state === "result") {
              if (toolName === "displayWeather") {
                const { result } = toolInvocation;
                return (
                  <div key={toolCallId} className="max-w-md">
                    <Weather {...result} />
                  </div>
                );
              } else if (toolName === "getStockPrice") {
                const { result } = toolInvocation;
                return (
                  <div key={toolCallId} className="max-w-md">
                    <Stock {...result} />
                  </div>
                );
              } else if (toolName === "swapTokens") {
                const { result } = toolInvocation;
                return (
                  <div key={toolCallId} className="max-w-md">
                    <SwapDemo {...result} />
                  </div>
                );
              } else if (toolName === "buyToken") {
                return (
                  <div key={toolCallId} className="max-w-md">
                    <BuyToken />
                  </div>
                );
              }
            } else {
              return (
                <div
                  key={toolCallId}
                  className="text-sm opacity-75 flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  <div className="animate-spin h-4 w-4 border-2 border-current rounded-full border-t-transparent"></div>
                  {toolName === "displayWeather" ? (
                    <div>Loading weather...</div>
                  ) : toolName === "getStockPrice" ? (
                    <div>Loading stock price...</div>
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
