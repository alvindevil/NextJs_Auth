"use client" 

import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    MyApp
                </Link>
                <nav className="space-x-6">
                    <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                        Home
                    </Link>
                    <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
                        About
                    </Link>
                    <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}