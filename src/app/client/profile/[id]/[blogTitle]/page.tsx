'use client'

import axios from "axios"
import React, { useEffect, useState } from "react"
import { use } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { FiShare2, FiClock, FiUser, FiCalendar, FiGlobe, FiLock, FiEdit } from "react-icons/fi"
import toast from "react-hot-toast"
import SidePanel from "@/components/layout/SidePanel"

export default function BlogPage({ params }: { params: Promise<{ blogTitle: string }> }) {
    const [blogData, setBlogData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { blogTitle } = use(params)
    const router = useRouter();

    // Calculate reading time
    const calculateReadingTime = (text: string) => {
        const wordsPerMinute = 200;
        const words = text.split(' ').length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Format relative date
    const formatRelativeDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            return "Yesterday";
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else {
            return formatDate(dateString);
        }
    };

    async function getBlogDetails() {
        try {
            setLoading(true);
            // First try to fetch by title
            let res = await axios.get(`/api/users/blogs/?title=${blogTitle}`);
            if (res.data.success && res.data.blogs) {
                setBlogData(res.data.blogs);
            } else {
                // If not found by title, we might need to implement another approach
                setError("Failed to load blog post");
            }
        } catch (error: any) {
            console.error("Error fetching blog:", error);
            setError("Error loading blog post");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBlogDetails();
    }, []);

    const togglePublicStatus = async () => {
        // Confirm before changing public status
        const newType = blogData.type === "public" ? "private" : "public";
        const confirm = window.confirm(`Are you sure you want to make this blog ${newType}?`);
        
        if (!confirm) return;

        try {
            // Update the blog's public status
            const res = await axios.patch(`/api/users/blogs`, {
                blogId: blogData._id,
                type: newType
            });
            
            if (res.data.success) {
                // Update local state
                setBlogData({
                    ...blogData,
                    type: newType
                });
                toast.success(`Blog is now ${newType}`);
            } else {
                toast.error(res.data.message || "Failed to update blog status");
            }
        } catch (error: any) {
            console.error("Error updating blog status:", error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error updating blog status");
            }
        }
    };

    const copyToClipboard = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            toast.success("Link copied to clipboard!");
        }, () => {
            toast.error("Failed to copy link");
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
                <div className="flex justify-between items-center px-6 py-3 bg-white shadow-md sticky top-0 z-40">
                    <div className="h-6 bg-gray-200 rounded w-32"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>

                <main className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6 mb-12 transition-all duration-300 hover:shadow-xl w-full">
                    <div className="animate-pulse space-y-8">
                        {/* Blog header skeleton */}
                        <header className="border-b border-gray-200 pb-6">
                            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg w-full">
                                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                                </div>
                            </div>
                        </header>

                        {/* Blog content skeleton */}
                        <article className="prose max-w-none prose-lg bg-gray-50 p-6 rounded-lg">
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                            </div>
                        </article>

                        {/* Blog actions skeleton */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-200">
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="h-10 bg-gray-200 rounded w-24"></div>
                                <div className="h-10 bg-gray-200 rounded w-24"></div>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                                <div className="h-4 bg-gray-200 rounded w-12"></div>
                                <div className="h-7 bg-gray-200 rounded w-14"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
                <div className="flex justify-between items-center px-6 py-3 bg-white shadow-md sticky top-0 z-40">
                    <Header title="NotionBlog" navigation={[]} />
                    <button
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition duration-200"
                        onClick={() => router.push("/client/profile")}
                    >
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                            Back to Profile
                        </span>
                    </button>
                </div>

                <main className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6 mb-12 transition-all duration-300 hover:shadow-xl w-full">
                    <div className="text-center py-12">
                        <div className="text-red-500 text-5xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Blog</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => router.push("/client/profile")}
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
                            >
                                Back to Profile
                            </button>
                            <button
                                onClick={getBlogDetails}
                                className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition w-full sm:w-auto"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
            {/* Sticky header */}
            <div className="flex justify-between items-center px-6 py-3 bg-white shadow-md sticky top-0 z-40">
                <Header title="NotionBlog" navigation={[]} />
                <button
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition duration-200 group"
                    onClick={() => router.push("/client/profile")}
                >
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full group-hover:bg-blue-200 transition">
                        Back to Profile
                    </span>
                </button>
            </div>

            {/* Main blog content */}
            <main className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6 mb-12 transition-all duration-300 hover:shadow-xl w-full">
                {blogData ? (
                    <div className="space-y-8">
                        {/* Blog header */}
                        <header className="border-b border-gray-200 pb-6">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight break-words mb-4">
                                {blogData.title}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <FiUser className="text-gray-500" />
                                    <span className="font-medium text-gray-800">{blogData.user}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <FiCalendar className="text-gray-500" />
                                    <span>{formatRelativeDate(blogData.createdAt)}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <FiClock className="text-gray-500" />
                                    <span>{calculateReadingTime(blogData.content)}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    {blogData.type === "public" ? (
                                        <FiGlobe className="text-green-500" />
                                    ) : (
                                        <FiLock className="text-gray-500" />
                                    )}
                                    <span className={`font-medium ${blogData.type === "public" ? "text-green-600" : "text-gray-600"}`}>
                                        {blogData.type === "public" ? "Public" : "Private"}
                                    </span>
                                </div>
                            </div>
                        </header>

                        {/* Blog content */}
                        <article className="prose max-w-none prose-lg text-gray-800 leading-relaxed bg-gray-50 p-6 rounded-lg">
                            <div className="whitespace-pre-wrap break-words">
                                {blogData.content.split('\n').map((paragraph: string, index: number) => (
                                    <p key={index} className="mb-4 last:mb-0">
                                        {paragraph || <>&nbsp;</>}
                                    </p>
                                ))}
                            </div>
                        </article>

                        {/* Blog actions */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-200">
                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
                                    onClick={() => router.push(`/client/edit/${blogData._id}`)}
                                >
                                    <FiEdit />
                                    <span>Edit</span>
                                </button>

                                <button
                                    onClick={copyToClipboard}
                                    className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200 transition duration-200"
                                >
                                    <FiShare2 />
                                    <span>Share</span>
                                </button>
                            </div>

                            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">Public</span>
                                <button
                                    onClick={togglePublicStatus}
                                    className={`w-14 h-7 flex items-center rounded-full p-1 duration-300 ease-in-out transition-colors ${
                                        blogData.type === "public" ? "bg-green-500" : "bg-gray-400"
                                    }`}
                                >
                                    <div
                                        className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out transition-transform ${
                                            blogData.type === "public" ? "translate-x-7" : ""
                                        }`}
                                    ></div>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 text-lg py-12">
                        Blog not found
                    </div>
                )}
            </main>
        </div>
    )
}
