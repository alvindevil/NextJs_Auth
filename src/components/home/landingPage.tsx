'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '../layout/header';
import Hero from '@/components/home/hero';
import { Loader } from "@/components/ui/Loader";


export default function LandingPage() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    function openLogin() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/login');
        }, 3000); // Simulate a delay for loading
    }

    function openSignup() {
        setLoading(true);
        router.push('/signup');
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
            <Header />
            {loading ? (
                (<div className='flex justify-center py-20'> <Loader /> </div>)
            ) : (
                <div>
                    <Hero onLogin={openLogin} onSignup={openSignup} />
                    <footer className="mt-20 py-8 text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} NotionBlog. All rights reserved.
                    </footer>
                </div>
            )}
        </div>
    );
}
