"use client";
import ChatInterface from "@/app/_components/ChatInterface";
import AgentMenuBar from "@/app/_components/AgentMenuBar";
import ActionInfoBar from "@/app/_components/ActionInfoBar";
import { useState } from "react";
import { IconInfoCircle } from "@tabler/icons-react";

export default function Page() {
  const [isInfoBarOpen, setIsInfoBarOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-12 min-h-screen">
        {/* Left Sidebar - AgentMenuBar (desktop only) */}
        <div className="hidden lg:block lg:col-span-2 bg-gray-50">
          <AgentMenuBar />
        </div>

        {/* Main Chat Area */}
        <div className="col-span-12 lg:col-span-7 flex flex-col bg-gray-100">
          <div className="flex-1 p-4">
            <ChatInterface />
          </div>
          {/* Mobile Bottom Tabs */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <AgentMenuBar.MobileNav />
          </div>
        </div>

        {/* Right Sidebar - ActionInfoBar (desktop) */}
        <div className="hidden lg:block lg:col-span-3 bg-gray-50">
          <ActionInfoBar />
        </div>

        {/* Mobile Info Button */}
        <button
          onClick={() => setIsInfoBarOpen(true)}
          className="fixed top-4 right-4 z-50 lg:hidden p-2 bg-white rounded-full shadow-lg"
        >
          <IconInfoCircle className="w-6 h-6" />
        </button>

        {/* Mobile Info Modal */}
        {isInfoBarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsInfoBarOpen(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 transition-transform transform translate-y-0">
              <ActionInfoBar.MobileView
                onClose={() => setIsInfoBarOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
