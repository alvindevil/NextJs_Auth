"use client";

interface SidePanelProps {
    onShowBlogs?: () => void;
}

export default function SidePanel({ onShowBlogs }: SidePanelProps) {
    return (
        <div className="w-full md:w-64 bg-white shadow-md h-full p-4 border-r border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Your Pages</h2>
            <ul className="space-y-2">
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">📄 New Page</li>
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">📝 Drafts</li>
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">📚 History</li>
                <li
                    className="text-blue-700 hover:text-blue-900 cursor-pointer font-semibold mt-4"
                    onClick={onShowBlogs}
                >
                    📚 Show Blogs
                </li>
            </ul>
        </div>
    );
}
