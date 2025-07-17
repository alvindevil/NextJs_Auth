'use client'
import React from "react";

import { useRouter } from "next/navigation";



export default function Home() {

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
        <div className="w-[400px] bg-gray-800 p-10 rounded-xl shadow-lg animate-pulse space-y-6">
          {/* Title */}
          <div className="h-8 w-24 bg-gray-700 rounded-md skeleton"></div>

          {/* Input 1 */}
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-700 rounded-md skeleton"></div>
            <div className="h-10 w-full bg-gray-700 rounded-lg skeleton"></div>
          </div>

          {/* Input 2 */}
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-700 rounded-md skeleton"></div>
            <div className="h-10 w-full bg-gray-700 rounded-lg skeleton"></div>
          </div>

          {/* Button */}
          <div className="h-10 w-full bg-gray-600 rounded-lg skeleton"></div>

          {/* Link */}
          <div className="h-4 w-1/2 bg-gray-700 mx-auto rounded-md skeleton"></div>
        </div>
      </div>
  );
}


  function openLogin() 
  {
    setLoading(true);
    setTimeout(() => {
      router.push('./login');
    }, 2000);
  }
  function openSignup() 
  {
    setLoading(true);
    router.push('./signup');
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      {loading ? (
        <LoadingSkeleton/>
      ): (
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl shadow-lg flex flex-col items-center space-y-6 w-11/12 max-w-md border border-white/20">
        <h1 className="text-4xl font-bold tracking-wide">Get Started</h1>
        <p className="text-center text-sm text-gray-300 max-w-xs">
          Welcome to our platform. Please log in or sign up to continue.
        </p>

        <div className="flex flex-col w-full space-y-4">
          <button
            onClick={openLogin}
            className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 rounded-lg transition duration-200 border border-white/30 cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={openSignup}
            className="bg-white/30 hover:bg-white/40 text-white font-medium py-3 rounded-lg transition duration-200 border border-white/30 cursor-pointer"
          >
            Signup
          </button>
        </div>
      </div>
      )}
    </div>

  );
}
