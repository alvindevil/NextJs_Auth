'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useState, useEffect, use } from "react"
import toast from "react-hot-toast"
import Textarea from "@/components/ui/Textarea"
import { Header } from "@/components/layout/header"

export default function EditBlog({ params }: { params: Promise<{ id: string }> }) {
    const { id: blogId } = use(params)
    const router = useRouter()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/api/users/blogs/?id=${blogId}`)
                if (res.data.success && res.data.blogs) {
                    setTitle(res.data.blogs.title)
                    setContent(res.data.blogs.content)
                } else {
                    setError("Failed to load blog")
                }
            } catch (err: any) {
                console.error("Error fetching blog:", err)
                setError("Error loading blog")
            } finally {
                setLoading(false)
            }
        }

        if (blogId) {
            fetchBlog()
        }
    }, [blogId])

    const handleSave = async () => {
        try {
            setSaving(true)
            const formData = new FormData()
            formData.append("title", title)
            formData.append("content", content)
            formData.append("blogId", blogId)

            const res = await axios.put(`/api/users/blogs`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            if (res.data.success) {
                toast.success("Blog updated successfully!")
                router.push(`/client/profile/${res.data.blog.user}/${res.data.blog.title}`)
            } else {
                toast.error(res.data.message || "Failed to update blog")
            }
        } catch (err: any) {
            console.error("Error updating blog:", err)
            toast.error("Failed to update blog")
        } finally {
            setSaving(false)
        }
    }

    const handleCancel = () => {
        router.back()
    }

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
                <div className="flex justify-between items-center px-6 py-3 bg-white shadow-md sticky top-0 z-40">
                    <Header title="NotionBlog" navigation={[]} />
                </div>
                <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <div className="animate-pulse space-y-6">
                            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-12 bg-gray-200 rounded"></div>
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
                <div className="flex justify-between items-center px-6 py-3 bg-white shadow-md sticky top-0 z-40">
                    <Header title="NotionBlog" navigation={[]} />
                </div>
                <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
                    <div className="bg-white p-8 rounded-xl shadow-md text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                        <p className="text-gray-700 mb-6">{error}</p>
                        <button
                            onClick={handleCancel}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Back to Profile
                        </button>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
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

            <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
                <div className="bg-white p-8 rounded-xl shadow-md">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Blog</h1>
                    
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
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={15}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 shadow-sm"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className={`px-6 py-2 rounded-lg transition duration-200 ${
                                saving 
                                    ? "bg-gray-400 cursor-not-allowed" 
                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                        >
                            {saving ? "Saving..." : "💾 Save Changes"}
                        </button>

                        <button
                            onClick={handleCancel}
                            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}
