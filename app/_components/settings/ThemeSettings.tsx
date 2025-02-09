"use client";

import { useTheme } from "@/app/providers/ThemeProvider";
import {
  IconSun,
  IconMoon,
  IconDeviceDesktop,
  IconCheck,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

const themes = [
  {
    id: "light",
    name: "Light",
    icon: IconSun,
  },
  {
    id: "dark",
    name: "Dark",
    icon: IconMoon,
  },
  {
    id: "system",
    name: "System",
    icon: IconDeviceDesktop,
  },
] as const;

export default function ThemeSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">Theme</h3>
      <div className="grid grid-cols-3 gap-2">
        {themes.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTheme(id)}
            className={`
              relative p-3 flex flex-col items-center gap-2 rounded-lg
              border-2 transition-all duration-200
              ${
                theme === id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-500/50 dark:hover:border-blue-500/50"
              }
            `}
          >
            <Icon
              className={`w-5 h-5 ${
                theme === id
                  ? "text-blue-500"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            />
            <span
              className={`text-sm ${
                theme === id
                  ? "text-blue-500 font-medium"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {name}
            </span>
            {theme === id && (
              <motion.div
                layoutId="theme-selected"
                className="absolute -top-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <IconCheck className="w-3 h-3" />
              </motion.div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
