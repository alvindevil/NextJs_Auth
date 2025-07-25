'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {Header} from '@/components/layout/Header';
import Hero from '@/components/home/hero';
import { Loader } from "@/components/ui/Loader";
import Footer from '../layout/Footer';
import About from './about';
import Features from './feature';

export default function LandingPage() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    function openLogin() {
        setLoading(true);
        router.push('/login');
    }

    function openSignup() {
        setLoading(true);
        router.push('/signup');
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
            <Header
                title="NotionBlog"
                navigation={[
                    { label: "Home", href: "/" },
                    { label: "Features", href: "#features", scrollToId: "features" },
                    { label: "About", href: "#about", scrollToId: "about" },
                ]}
            />

            {loading ? (
                (<div className='flex justify-center py-20'> <Loader /> </div>)
            ) : (
                <div>
                    <Hero onLogin={openLogin} onSignup={openSignup} />
                    <div id='features'> <Features/> </div>
                    <div id='about'> <About /> </div>
                    <Footer />
                </div>
            )}
        </div>
    );
}
