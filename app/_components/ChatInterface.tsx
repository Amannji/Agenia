"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "../../components/Message";
import { motion } from "framer-motion";
import { usePrivy } from "@privy-io/react-auth";

export default function ChatInterface() {
  const { login, authenticated } = usePrivy();
  const { messages, input, append, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "👋 Welcome to Agenia! I'm your personal DeFi assistant\n" +
          "📲I can help you with:\n" +
          "• Getting real-time DeFi protocol information and analytics\n" +
          "• Executing token swaps and trades\n" +
          "• Monitoring your portfolio performance\n" +
          "• Explaining complex DeFi concepts in simple terms\n\n" +
          "What would you like to explore today?",
      },
    ],
  });

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if input contains DeFi related keywords
    const defiKeywords = [
      "blockchain",
      "crypto",
      "token",
      "swap",
      "defi",
      "eth",
      "btc",
      "wallet",
      "protocol",
      "tvl",
    ];
    const requiresAuth = defiKeywords.some((keyword) =>
      input.toLowerCase().includes(keyword.toLowerCase())
    );

    if (!authenticated && requiresAuth) {
      login();
      return;
    }

    if (input.trim()) {
      setIsTyping(true);
      handleSubmit(e);
      setIsTyping(false);
      scrollToBottom();
    }
  };

  const handleSuggestedAction = (content: string) => {
    // All suggested actions are DeFi-related, so they require auth
    if (!authenticated) {
      login();
      return;
    }
    append({
      role: "user",
      content: content,
    });
  };

  const suggestedActions = [
    {
      name: "Check DeFi Stats",
      description: "Get latest protocol analytics",
      onClick: () => {
        handleSuggestedAction(
          "What are the current TVL stats for major DeFi protocols?"
        );
      },
    },
    {
      name: "Token Swap",
      description: "Swap tokens at best rates",
      onClick: () => {
        handleSuggestedAction(
          "I want to swap ETH for USDC. What are the current rates?"
        );
      },
    },
  ];

  return (
    <>
      <Card className="w-full h-[calc(100vh-4rem)] lg:h-[95vh] flex flex-col">
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
                  {suggestedActions.map((action) => (
                    <button
                      key={action.name}
                      onClick={action.onClick}
                      className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      {action.name}
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
          <div className="flex flex-wrap gap-3">
            {messages.length == 0 &&
              suggestedActions.map((action, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  key={index}
                  className="w-full sm:w-auto"
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
              ))}
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
