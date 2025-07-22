'use client'
import axios from "axios"
import React from "react";
import { useRouter } from "next/navigation";
import {toast} from "react-hot-toast";

export default function ProfilePage()
{
    const router = useRouter();
    const logout = async () =>{
        try {
            const response = await axios.get('/api/users/logout');
            console.log("Logout response: ", response.data);
            alert(response.data.message || "Logout successful");
            toast.success(response.data.message || "Logout successful");
            console.log("redirecting to login page");
            router.push('/login');
            console.log("Login page ");
        } catch (error: any) {
            console.error("Logout error:", error);
            alert(error.response.data.message || "Logout failed");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1>Profile</h1> <br/>
            <p>Welcome to your profile!</p>
            <div>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200">
                    Logout 
                </button>
            </div>
        </div>
    )
}


