// import { usePrivy, useWallets } from "@privy-io/react-auth";
// import { useEffect, useState } from "react";
import { UserPill } from "@privy-io/react-auth/ui";
import { IconX } from "@tabler/icons-react";

interface ActionInfoBarProps {
  onClose?: () => void;
}

function ActionInfoBar({ onClose }: ActionInfoBarProps) {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mt-2 mx-2 gap-1">
        <div className="flex items-center gap-2">
          <UserPill
            action={{ type: "login", options: { loginMethods: ["email"] } }}
          />
          <a
            href="https://forms.gle/your-form-link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-[0.6rem] px-6 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Feedback
          </a>
        </div>
      </div>
      <div className="w-3xl p-6 h-[15rem] rounded-xl bg-white shadow-sm border border-gray-100 m-2">
        <h1>Actions History</h1>
      </div>
    </div>
  );
}

// Mobile View Component
function MobileView({ onClose }: ActionInfoBarProps) {
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Info</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <IconX className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <UserPill
            action={{ type: "login", options: { loginMethods: ["email"] } }}
          />
          <a
            href="https://forms.gle/your-form-link"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Feedback
          </a>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-medium mb-2">Actions History</h3>
          {/* Actions history content */}
        </div>
      </div>
    </div>
  );
}

ActionInfoBar.MobileView = MobileView;
export default ActionInfoBar;
