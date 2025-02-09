"use client";
import { Stock } from "./stock";
import { SwapDemo } from "./onchainKit/Swap";
import { Weather } from "./weather";
import { BuyToken } from "./onchainKit/BuyToken";
export default function Message({ id, role, content, toolInvocations }) {
  return (
    <div
      key={id}
      className={`mb-4 flex ${
        role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] ${
          role === "user" ? "bg-blue-500 text-white" : "bg-gray-100"
        } rounded-lg px-3 mt-2`}
      >
        <div className="font-medium text-sm opacity-75 my-1 capitalize">
          {role}
        </div>
        <div className="leading-relaxed whitespace-pre-wrap">{content}</div>

        <div className="mt-3 space-y-3">
          {toolInvocations?.map((toolInvocation: any) => {
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
                  className="text-sm opacity-75 flex items-center gap-2"
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
