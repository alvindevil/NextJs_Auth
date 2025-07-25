"use client";

export default function SidePanel() {
    return (
        <div className="w-full md:w-64 bg-white shadow-md h-full p-4 border-r border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Your Pages</h2>
            <ul className="space-y-2">
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">📄 New Page</li>
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">📝 Drafts</li>
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">📚 History</li>
            </ul>
        </div>
    );
}
