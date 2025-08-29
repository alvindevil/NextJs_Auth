"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, use } from "react";
import toast from "react-hot-toast";
import SidePanel from "@/components/layout/SidePanel";
import Textarea from "@/components/ui/Textarea";
import { Header } from "@/components/layout/header";
import { FiBookOpen } from "react-icons/fi";

export default function UserProfile({ params }: { params: Promise <{ id: string }> }) {
    const {id: urlUsername } = use(params)
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [showmessage, setShowMessage] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [showInvalid, setShowInvalid] = useState(false);
    const [blogs, setBlogs] = useState<any[]>([]);
    const [showBlogs, setShowBlogs] = useState(false);

    const handleShowBlogs = async () => {
        try {
            const res = await axios.get("/api/users/blogs");
            if (res.data.success) {
                setBlogs(res.data.blogs);
                setShowBlogs(true); 
            } else {
                toast.error("Failed to fetch blogs");
            }
        } catch (err) {
            toast.error("Failed to fetch blogs");
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("/api/users/me");
                const loggedInUsername = res.data.data.username;
                if (!loggedInUsername || loggedInUsername !== urlUsername) {
                    setShowInvalid(true);
                } 
            } catch (error) {
                console.error("Error checking username:", error);
            }
        };
        checkAuth();
    }, [urlUsername, router]);

    useEffect(() => {
        if (showmessage) {
            const timeout = setTimeout(() => {
                setShowMessage("");
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [showmessage]);

    const handleOpenBlog = async (blog:any) => {
        router.push(`/client/profile/${urlUsername}/${blog.title}`)
        console.log("here's the blog data : ",blog);
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", text);
            if (image) formData.append("image", image);

            const response = await axios.post("/api/users/blogs", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
                setTitle("");
                setText("");
                setImage(null);
                setShowMessage("Blog added successfully");
                toast.success("Blog created successfully!");
            }
        } catch (err) {
            toast.error("Failed to save blog");
        }
    };

    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            toast.success(response.data.message || "Logout successful");
            router.push("/client/login");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Logout failed");
        }
    };

    const customItems = [
        {
            label: "Show Blogs",
            icon: <FiBookOpen />,
            onClick: handleShowBlogs, 
            className: "text-blue-700 font-semibold",
        },
    ];


    return (
        <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
            {showmessage && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 transition-all duration-300">
                    {showmessage}
                </div>
            )}

            <div className="flex justify-between items-center px-6 bg-white shadow-md sticky top-0 z-40">
                <Header title="NotionBlog" navigation={[]} />
                <button
                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition duration-200"
                    onClick={() => router.push("/client/profile")}
                >
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        {urlUsername.toUpperCase()} Profile
                    </span>
                </button>
            </div>

            {showInvalid ? (
                <div className="m-auto bg-white p-8 rounded-xl shadow-md text-center max-w-md mt-16">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">🚫 Invalid User</h2>
                    <p className="text-gray-600 mb-4">
                        Username doesn't match. Please logout and log in again.
                    </p>
                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row w-full">
                    <aside className="w-full md:w-64 bg-white border-r border-gray-200">
                        <SidePanel
                            blogs={blogs}
                            setShowBlogs={setShowBlogs}
                            handleOpenBlog={handleOpenBlog}
                            handleFetchBlogs={handleShowBlogs}
                            customItems={customItems}
                        />
                    </aside>

                    <main className="flex-1 p-6">
                        {showBlogs ? (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Your Blogs</h2>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        onClick={() => setShowBlogs(false)}
                                    >
                                        Write Blog
                                    </button>
                                </div>
                                {blogs.length === 0 ? (
                                    <p className="text-gray-500">No blogs found.</p>
                                ) : (
                                    <ul className="space-y-4">
                                        {blogs.map((blog) => (
                                            <li
                                                key={blog._id}
                                                className="p-4 bg-white rounded shadow cursor-pointer hover:bg-blue-50"
                                                onClick={() => handleOpenBlog(blog)}
                                            >
                                                <h3 className="text-xl font-semibold">{blog.title}</h3>
                                                <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(blog.createdAt).toLocaleString()}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="mb-8">
                                    <h1 className="text-3xl font-semibold text-gray-800">
                                        👋 Welcome, <span className="text-blue-600">{urlUsername}</span>
                                    </h1>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Start writing your thoughts below.
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter blog title..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 shadow-sm"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Content
                                    </label>
                                    <Textarea
                                        placeholder="Start writing your thoughts..."
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        rows={10}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Upload Image (optional)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                                        className="w-full file:py-2 file:px-4 file:border-0 file:rounded-md file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-150"
                                    />
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                                    >
                                        💾 Save Blog
                                    </button>

                                    <button
                                        onClick={logout}
                                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                                    >
                                        🚪 Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </main>
                </div>
            )}
        </div>
    );
}
