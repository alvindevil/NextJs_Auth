"use client";

import React, { useEffect, useState } from "react";

export default function AlertBox({
  message,
  type = "error",
  onClose,
}: {
  message: string;
  type?: "error" | "success";
  onClose: () => void;
}) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Auto-play sound on mount
    const audio = new Audio(
      type === "error" ? "/sounds/error.mp3" : "/sounds/success.mp3"
    );
    audio.volume = 0.6;
    audio.play().catch((err) => {
      // optional: handle autoplay issues in some browsers
      console.warn("Audio play failed:", err);
    });
  }, [type]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 w-[90%] max-w-sm rounded-xl shadow-2xl border border-white/20 backdrop-blur-md
      text-white px-6 py-4 
      ${type === "error" ? "bg-gradient-to-r from-red-600 to-red-500" : "bg-gradient-to-r from-green-600 to-green-500"}
      transition-all duration-500 ease-in-out transform
      ${show ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-90 translate-x-10"}
    `}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {type === "error" ? (
            <svg
              className="w-6 h-6 text-white animate-pulse"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m6.938 4h-13.856C4.477 20 4 19.523 4 18.938V5.062C4 4.477 4.477 4 5.062 4h13.876C19.523 4 20 4.477 20 5.062v13.876c0 .585-.477 1.062-1.062 1.062z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-white animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
          <span className="text-sm font-medium">{message}</span>
        </div>
        <button
          onClick={() => {
            setShow(false);
            setTimeout(onClose, 300);
          }}
          className="hover:text-white text-white text-lg font-bold transition-opacity duration-200"
        >
          ✖
        </button>
      </div>
    </div>
  );
}
