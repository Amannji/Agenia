"use client";
import React from "react";
import { useCompletion } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatInterface() {
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useCompletion();

  const [messages, setMessages] = React.useState<
    Array<{ id: string; role: "user" | "assistant"; content: string }>
  >([]);

  // Add message to chat history when completion changes
  React.useEffect(() => {
    if (completion) {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];

        // If last message is from assistant, update it
        if (lastMessage?.role === "assistant") {
          return [
            ...prev.slice(0, -1),
            {
              ...lastMessage,
              content: completion,
            },
          ];
        }

        // Otherwise create new assistant message
        return [
          ...prev,
          {
            id: Math.random().toString(36).substring(7),
            role: "assistant",
            content: completion,
          },
        ];
      });
    }
  }, [completion]);

  // Wrap handleSubmit to add user message to history
  const onSubmit = (e: React.FormEvent) => {
    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(7),
          role: "user",
          content: input.trim(),
        },
      ]);
      setInput("");
    }

    handleSubmit(e);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-1 col-span-6 min-h-screen overflow-auto">
      <Card className="w-full max-w-2xl flex flex-col">
        <CardContent className="flex-grow overflow-auto">
          <ScrollArea className="h-[650px] p-2">
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
            {isLoading && (
              <div className="text-left">
                <span className="inline-block p-2 rounded-lg bg-gray-200 text-black">
                  AI is typing...
                </span>
              </div>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={onSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              Send
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setMessages([])}
              disabled={isLoading || messages.length === 0}
            >
              Clear
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
