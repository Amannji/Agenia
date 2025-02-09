"use client";

// import { usePrivy } from "@privy-io/react-auth";
// import { useEffect } from "react";
import {
  IconUser,
  IconWallet,
  IconSettings,
  IconHelp,
  IconX,
} from "@tabler/icons-react";
import SettingsScreen from "./settings/SettingsScreen";
import { useState } from "react";

interface AgentMenuBarProps {
  onClose?: () => void;
}

function AgentMenuBar({ onClose }: AgentMenuBarProps) {
  const [showSettings, setShowSettings] = useState(false);

  const menuItems = [
    { icon: IconUser, label: "Profile" },
    { icon: IconWallet, label: "Portfolio" },
    { icon: IconHelp, label: "Support" },
    {
      icon: IconSettings,
      label: "Settings",
      onClick: () => setShowSettings(true),
    },
  ];

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex items-center justify-between px-4 py-6 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Agentia
          </h1>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <IconX className="w-5 h-5 dark:text-gray-400" />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-6 px-3">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 cursor-pointer transition-all group"
            >
              <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200" />
              <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-gray-900 dark:group-hover:text-gray-100">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-xl">
            <SettingsScreen onClose={() => setShowSettings(false)} />
          </div>
        </div>
      )}
    </>
  );
}

// Mobile Navigation Component
function MobileNav() {
  return (
    <div className="flex justify-around items-center h-16 px-2 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      {[
        { icon: IconUser, label: "Profile" },
        { icon: IconWallet, label: "Portfolio" },
        { icon: IconHelp, label: "Support" },
        { icon: IconSettings, label: "Settings" },
      ].map((item) => (
        <button
          key={item.label}
          className="flex flex-col items-center gap-1 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="text-xs text-gray-600 dark:text-gray-300">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}

AgentMenuBar.MobileNav = MobileNav;
export default AgentMenuBar;
