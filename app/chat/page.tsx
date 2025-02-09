"use client";
import ChatInterface from "@/app/_components/ChatInterface";
import AgentMenuBar from "@/app/_components/AgentMenuBar";
import ActionInfoBar from "@/app/_components/ActionInfoBar";

export default function Page() {
  return (
    <>
      <div className="grid grid-cols-12 min-h-screen">
        <div className="col-span-2 bg-gray-50">
          <AgentMenuBar />
        </div>
        <div className="col-span-7 flex items-center justify-center bg-gray-100 p-4">
          <ChatInterface />
        </div>
        <div className="col-span-3 bg-gray-50">
          <ActionInfoBar />
        </div>
      </div>
    </>
  );
}
