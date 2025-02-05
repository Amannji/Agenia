"use client";
import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
export default function AgentMenuBar() {
  const [openSupportMenu, setOpenSupportMenu] = useState(false);
  const { logout } = usePrivy();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const closeMenuTimer = () => {
    const timer = setTimeout(() => {
      setOpenSupportMenu(false);
    }, 2000);
    return timer;
  };

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  };

  const handleMouseLeave = () => {
    const timer = closeMenuTimer();
    setTimeoutId(timer);
  };

  return (
    <>
      <div className="bg-gray-50 flex flex-col min-h-screen col-span-3">
        <h1 className="text-2xl font-bold text-center pt-8 pb-12">Agenia</h1>

        <div className="mt-auto mb-8 w-full px-4">
          <div className="w-full mb-4">
            <button className="w-full text-left bg-gray-100 hover:bg-gray-100 rounded-lg p-4 cursor-default">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Usage</span>
                <span className="text-sm text-gray-600">80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </button>
          </div>

          <div className="relative w-full">
            <button className="w-full text-left bg-gray-100 hover:bg-gray-100 rounded-lg p-4 cursor-default flex items-center justify-between">
              <div className="flex items-center">
                <div className="rounded-full h-2 w-2"></div>
                <p className="ml-2">amangpt@gmail.com</p>
              </div>
              <div className="relative group">
                <button
                  className="hover:bg-gray-200 p-1 rounded-full"
                  onClick={() => {
                    setOpenSupportMenu(!openSupportMenu);
                    if (!openSupportMenu) {
                      const timer = closeMenuTimer();
                      setTimeoutId(timer);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                {openSupportMenu && (
                  <div
                    className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-md shadow-lg py-1"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      Support
                    </button>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      Subscription
                    </button>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      Settings
                    </button>
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
