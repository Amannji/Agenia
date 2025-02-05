"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
                className={`mb-4 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {message.content}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="text-left">
                <span className="inline-block p-2 rounded-lg bg-gray-200 text-black">
                  AI is typing...
                </span>
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
