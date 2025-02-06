"use client";

import { useCompletion } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatInterface() {
  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-1 col-span-6">
      <Card className="w-full max-w-2xl h-full flex flex-col">
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-full pr-4">
            {/* {.map((message) => (
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
            ))} */}
            {completion}
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
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
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
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
