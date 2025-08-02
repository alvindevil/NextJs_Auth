"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface UserData {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
}

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)
    
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            console.log("Logout successful");
            toast.success('Logout successful')
            router.push('/client/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me')
            console.log(res.data);
            setData(res.data.data)
        } catch (error: any) {
            console.log(error.message);
            toast.error("Failed to fetch user details")
        }
    }

    useEffect(() => {
        getUserDetails().finally(() => setLoading(false));
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header title="NotionBlog" />
                <div className="flex flex-col items-center justify-center flex-1">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header title="NotionBlog" />
            
            {/* Main Content */}
            <div className="flex flex-col items-center justify-center flex-1 p-4 bg-gray-50">
                <div className="w-full max-w-2xl">
                    <div className="text-center mb-8">
                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl font-bold text-blue-600">
                                {data?.username ? data.username.charAt(0).toUpperCase() : "U"}
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800">Welcome, {data?.username || "User"}</h1>
                        <p className="text-gray-600 mt-2">Manage your profile and blogs</p>
                    </div>

                    <Card className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="text-gray-600">Username:</span>
                                <span className="font-medium">{data?.username || "N/A"}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="text-gray-600">Email:</span>
                                <span className="font-medium">{data?.email || "N/A"}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="text-gray-600">Account Status:</span>
                                <span className={`font-medium ${data?.isVerified ? "text-green-600" : "text-yellow-600"}`}>
                                    {data?.isVerified ? "Verified" : "Not Verified"}
                                </span>
                            </div>
                        </div>
                    </Card>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={() => data?.username && router.push(`/client/profile/${data.username}`)}
                            variant="primary"
                            className="flex items-center justify-center gap-2"
                        >
                            <span>📝</span>
                            <span>Write a Blog</span>
                        </Button>
                        
                        <Button
                            onClick={getUserDetails}
                            variant="outline"
                            className="flex items-center justify-center gap-2"
                        >
                            <span>🔄</span>
                            <span>Refresh Profile</span>
                        </Button>
                    </div>

                    <div className="mt-8 text-center">
                        <Button
                            onClick={logout}
                            variant="secondary"
                            className="w-full sm:w-auto"
                        >
                            Logout
                        </Button>
                        <p className="text-gray-600 text-sm mt-4">
                            Visit your profile page to manage your blogs and account settings
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
