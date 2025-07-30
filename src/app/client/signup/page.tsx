'use client';

import Link from "next/link";
import React, { use } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "mongoose";
import toast from "react-hot-toast";
import { log } from "console";
import {Header} from "@/components/layout/Header";


export default function SignupPage() {

    const router = useRouter();

    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const[loading, setLoading] = React.useState(false); 

    const [user,setUser] = React.useState({
        username :"",
        email :"",
        password:"",
    })


    const onSignUp = async()=>{
        try {
            setLoading(true);
            console.log("Signing up:", user.username);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup Done and here is data which is send :", response);
            router.push('/client/login');
        } 
        catch (error : any) {
            console.log("Signup failed", error.message);
            toast.error(error.message );
        }

        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length >0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user.username, user.email, user.password]);

    // Function to test GET request to backend
    const testBackend = async () => {
        try {
            const res = await axios.get('/api/users/signup');
            toast.success(res.data.message || 'Backend is working!');
            console.log(res.data);
        } catch (err: any) {
            toast.error('Backend test failed');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white flex flex-col">
      {/* Header (same as Login page) */}
      <div className="w-full">
        <Header />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md backdrop-blur-xl bg-gray-800/70 p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Signup</h1>

          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-medium">
              Username:
            </label>
            <input
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="yourname"
              className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
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
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
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
            onClick={onSignUp}
            disabled={buttonDisabled}
            className={`w-full py-2 px-4 font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 
              ${
                buttonDisabled
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
          >
            {loading ? 'Signing up...' : buttonDisabled ? 'Fill all fields' : 'Signup'}
          </button>

          <p className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/client/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
    );
}