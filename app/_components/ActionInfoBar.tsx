// import { usePrivy, useWallets } from "@privy-io/react-auth";
// import { useEffect, useState } from "react";
import { UserPill } from "@privy-io/react-auth/ui";
export default function ActionInfoBar() {
  return (
    <>
      <div className="flex items-center mt-2 mx-2 gap-1">
        <div>
          <UserPill
            action={{ type: "login", options: { loginMethods: ["email"] } }}
            label={<p>amangpt314@gmail.com</p>}
          />
        </div>
        <div className="p-1">
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
        {/* Content for second card */}
        <h1>Actions History</h1>
      </div>
    </>
  );
}
