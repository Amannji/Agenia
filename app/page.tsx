"use client";
import { Button } from "@/components/ui/button";
import ChatInterface from "@/app/_components/ChatInterface";
import AgentMenuBar from "@/app/_components/AgentMenuBar";
import ActionInfoBar from "@/app/_components/ActionInfoBar";

import { usePrivy } from "@privy-io/react-auth";
import { useState } from "react";

export default function Page() {
  const { login, user } = usePrivy();
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      {user ? (
        <div className="grid grid-cols-12 min-h-screen">
          <div
            className={`transition-all duration-300 ${
              isCollapsed ? "col-span-[0.5]" : "col-span-2"
            } bg-gray-50`}
          >
            <AgentMenuBar
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          </div>
          <div
            className={`transition-all duration-300 ${
              isCollapsed ? "col-span-8" : "col-span-7"
            } flex items-center justify-center bg-gray-100 p-4`}
          >
            <ChatInterface />
          </div>
          <div className="col-span-3 bg-gray-50">
            <ActionInfoBar />
          </div>
        </div>
      ) : (
        <>
          <nav className="w-full px-6 py-4 flex justify-between items-center border-b">
            <h1 className="text-2xl font-bold">Agenia</h1>
            <Button variant="default" size="lg" onClick={login}>
              Try it for free
            </Button>
          </nav>

          <main className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-bold leading-tight mb-6">
                  Your Smart DeFi Assistant
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Navigate the world of decentralized finance with ease. Agenia
                  simplifies complex DeFi concepts and helps you make informed
                  decisions through natural conversations.
                </p>
                <Button variant="default" size="lg">
                  Get Started Now
                </Button>
              </div>

              <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Agenia Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}
