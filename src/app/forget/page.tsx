"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AlertBox from "@/components/ui/AlertBox";

export default function Forget() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("error");
  const [showAlert, setShowAlert] = useState(false);

  const playSoundAndShowAlert = (
    message: string,
    type: "success" | "error"
  ) => {
    const audio = new Audio(
      type === "error" ? "/sounds/error.mp3" : "/sounds/success.mp3"
    );
    audio.volume = 0.7;

    audio.addEventListener("canplaythrough", () => {
      try {
        audio.currentTime = 0.1; // Skip initial silence
      } catch (err) {
        console.warn("Skipping failed:", err);
      }
      audio.play().catch((err) => {
        console.warn("Audio playback failed:", err);
      });
    });

    audio.load(); // Ensure preload starts

    // Delay alert display slightly for better sync
    setTimeout(() => {
      setAlertMessage(message);
      setAlertType(type);
      setShowAlert(true);

      setTimeout(() => setShowAlert(false), 3000);
    }, 300); // Show after 300ms
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonDisabled(true);

    try {
      const response = await axios.post("/api/users/forget", { email });

      if (response.status === 200) {
        playSoundAndShowAlert("Password reset link sent to your email", "success");
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Error resetting password:", error);
      if (error.response && error.response.status === 404) {
        playSoundAndShowAlert("Please enter a correct email!", "error");
      } else {
        playSoundAndShowAlert("Something went wrong. Try again later.", "error");
      }
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      {showAlert && (
        <AlertBox
          message={alertMessage}
          type={alertType}
          onClose={() => setShowAlert(false)}
        />
      )}

      <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Forgot Password</h2>
        <form className="space-y-5" onSubmit={handleResetPassword}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-2">
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            disabled={buttonDisabled}
            className={`w-full py-2 px-4 font-semibold rounded transition ${
              buttonDisabled
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {buttonDisabled ? "Bus 2 min..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
