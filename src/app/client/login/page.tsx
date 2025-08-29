'use client';

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import {Header} from "@/components/layout/header";


export default function LoginPage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",   
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            const userdata = response.data;
            console.log("Login response: ", response.data);
            console.log("Username ", response.data.username);
            toast.success(response.data.message || "Login successful");
            router.push(`/client/profile/${userdata.username}`); 
        } catch (error: any) {
            console.error("Login error:", error);
            const errorMessage = error.response.data.message || "Login failed";
            toast.error(errorMessage);

        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(user.email.length >0 && user.password.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white flex flex-col">
  <div className="w-full">
    <Header />
  </div>


  <div className="flex flex-1 items-center justify-center px-4">
    <div className="w-full max-w-md backdrop-blur-xl bg-gray-800/70 p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium" htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email@example.com"
          className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium" htmlFor="password">
          Password:
        </label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="••••••••"
          className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={onLogin}
        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="mt-4 text-center text-sm">
        <Link href="/forget" className="text-blue-400 hover:underline ">
          Forget Password 
        </Link>
      </p>
      <p className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link href="/client/signup" className="text-blue-400 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  </div>
</div>

    );
}
