'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {Header} from '@/components/layout/Header';
import Hero from '@/components/home/hero';
import  Loader  from "@/components/ui/Loader";
import Footer from '../layout/Footer';
import About from './about';
import Features from './feature';
import { set } from 'mongoose';

export default function LandingPage() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    function openLogin() {
        setLoading(true);
        setTimeout(() => {
            router.push('/login');
        }, 2000);
    }

    function openSignup() {
        setLoading(true);
        setTimeout(() => {
            router.push('/signup');
        }, 2000);
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
            

            {loading ? (
                (
                    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950">
                        <Loader />
                    </div>
                )
            ) : (
                <div>
                    <Header
                title="NotionBlog"
                navigation={[
                    { label: "Home", href: "/" },
                    { label: "Features", href: "#features", scrollToId: "features" },
                    { label: "About", href: "#about", scrollToId: "about" },
                ]}
            />
                    <Hero onLogin={openLogin} onSignup={openSignup} />
                    <div id='features'> <Features/> </div>
                    <div id='about'> <About /> </div>
                    <Footer />
                </div>
            )}
        </div>
    );
}
