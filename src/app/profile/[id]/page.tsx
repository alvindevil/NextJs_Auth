"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, use } from "react";
import toast from "react-hot-toast";
import SidePanel from "@/components/layout/sidePanel";
import Textarea from "@/components/ui/Textarea";

export default function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id: userName } = use(params); 
    const router = useRouter();
    const [text, setText] = useState("");

    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            toast.success(response.data.message || "Logout successful");
            alert("Logout successful");
            router.push("/login");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Logout failed");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="hidden md:block w-1/4">
                <SidePanel />
            </div>

            <div className="flex-1 p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        👋 Welcome, <span className="text-blue-500">{userName}</span>
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">Start writing your thoughts below.</p>
                </div>

                {/* Writing Area */}
                <Textarea
                    placeholder="Start writing your thoughts..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={8}
                />

                <button
                    onClick={logout}
                    className="mt-6 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
