"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Weather } from "@/components/weather";
import { Stock } from "@/components/stock";

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      setIsTyping(true);
      handleSubmit(e);
      setIsTyping(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-1 col-span-6">
      <Card className="w-full max-w-2xl h-full flex flex-col">
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-full pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  } rounded-lg p-3`}
                >
                  <div className="font-medium text-sm opacity-75 mb-1 capitalize">
                    {message.role}
                  </div>
                  <div className="leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </div>

                  <div className="mt-3 space-y-3">
                    {message.toolInvocations?.map((toolInvocation) => {
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
            ))}
            {isTyping && (
              <div className="flex justify-start my-2">
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={onSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit" disabled={isTyping || !input.trim()}>
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
