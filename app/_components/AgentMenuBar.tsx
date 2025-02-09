"use client";

// import { usePrivy } from "@privy-io/react-auth";
// import { useEffect } from "react";
import {
  IconUser,
  IconWallet,
  IconSettings,
  IconHelp,
} from "@tabler/icons-react";

interface AgentMenuBarProps {
  onClose?: () => void;
}

const menuItems = [
  { icon: IconUser, label: "Profile" },
  { icon: IconWallet, label: "Portfolio" },
  { icon: IconHelp, label: "Support" },
  { icon: IconSettings, label: "Settings" },
];

function AgentMenuBar({ onClose }: AgentMenuBarProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Agentia
        </h1>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <IconX className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2 mt-6 px-3">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-all group"
          >
            <item.icon className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
            <span className="text-gray-700 font-medium group-hover:text-gray-900">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Mobile Navigation Component
function MobileNav() {
  return (
    <div className="flex justify-around items-center h-16 px-2">
      {menuItems.map((item) => (
        <button
          key={item.label}
          className="flex flex-col items-center gap-1 p-2"
        >
          <item.icon className="w-5 h-5 text-gray-600" />
          <span className="text-xs text-gray-600">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

AgentMenuBar.MobileNav = MobileNav;
export default AgentMenuBar;
