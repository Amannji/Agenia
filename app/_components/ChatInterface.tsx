"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "../../components/Message";
import { motion } from "framer-motion";

export default function ChatInterface() {
  const { messages, input, append, handleInputChange, handleSubmit } =
    useChat();

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]); // Update to scroll when messages change

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      setIsTyping(true);
      handleSubmit(e);
      setIsTyping(false);
      scrollToBottom();
    }
  };

  const suggestedActions = [
    {
      name: "Get Stock Price",
      description: "Get the price Apple",
      onClick: () => {
        append({
          role: "user",
          content: "What is the price of AAPL?",
        });
      },
    },
    {
      name: "Get Weather",
      description: "Get the weather in Tokyo",
      onClick: () => {
        append({
          role: "user",
          content: "What is the weather in Tokyo?",
        });
      },
    },
  ];

  return (
    <>
      <Card className="w-full h-full max-h-[95vh] flex flex-col">
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-full pr-4">
            {messages.map((message) => (
              <Message
                key={message.id}
                id={message.id}
                role={message.role}
                content={message.content}
                toolInvocations={message.toolInvocations}
              />
            ))}
            {messages.length > 0 &&
              messages[messages.length - 1].role === "assistant" && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    "Tell me more about this",
                    "What are the risks?",
                    "How can I get started?",
                    "Can you explain it simpler?",
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => {
                        append({
                          role: "user",
                          content: prompt,
                        });
                      }}
                      className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

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
        <CardFooter className="flex flex-col gap-2">
          <div className="flex gap-3">
            {messages.length == 0 &&
              suggestedActions.map((action, index) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    key={index}
                    className={index > 1 ? "hidden sm:block" : "block"}
                  >
                    <button
                      onClick={action.onClick}
                      className="w-full text-left border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 rounded-lg p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex flex-col"
                    >
                      <span className="font-medium">{action.name}</span>
                      <span className="text-zinc-500 dark:text-zinc-400">
                        {action.description}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
          </div>
          <form onSubmit={handleFormSubmit} className="flex w-full space-x-2">
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
    </>
  );
}
