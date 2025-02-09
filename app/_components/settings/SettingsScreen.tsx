"use client";

import { IconX } from "@tabler/icons-react";
import ThemeSettings from "./ThemeSettings";

interface SettingsScreenProps {
  onClose?: () => void;
}

export default function SettingsScreen({ onClose }: SettingsScreenProps) {
  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
        <h2 className="text-xl font-semibold dark:text-white">Settings</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <IconX className="w-5 h-5 dark:text-gray-400" />
          </button>
        )}
      </div>
      <div className="p-4 space-y-4">
        <ThemeSettings />
        {/* Add more settings sections here */}
      </div>
    </div>
  );
}
