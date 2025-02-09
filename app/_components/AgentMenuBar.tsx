"use client";

// import { usePrivy } from "@privy-io/react-auth";
// import { useEffect } from "react";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
} from "@tabler/icons-react";

interface AgentMenuBarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function AgentMenuBar({
  isCollapsed,
  setIsCollapsed,
}: AgentMenuBarProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white shadow-sm">
      <div
        className={`flex items-center ${
          isCollapsed ? "justify-center" : "justify-between"
        } px-4 py-6 border-b border-gray-100`}
      >
        {!isCollapsed && (
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Agentia
          </h1>
        )}
        {/* <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isCollapsed ? (
            <IconLayoutSidebarRightCollapse className="w-5 h-5 text-gray-600" />
          ) : (
            <IconLayoutSidebarLeftCollapse className="w-5 h-5 text-gray-600" />
          )}
        </button> */}
      </div>

      <div className="flex flex-col gap-2 mt-6 px-3">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-all group">
          <span className="text-gray-700 font-medium group-hover:text-gray-900">
            Portfolio
          </span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-all group">
          <span className="text-gray-700 font-medium group-hover:text-gray-900">
            Support
          </span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-all group">
          <span className="text-gray-700 font-medium group-hover:text-gray-900">
            Settings
          </span>
        </button>
      </div>
    </div>
  );
}
