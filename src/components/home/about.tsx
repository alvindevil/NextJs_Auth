import React from "react";

export default function About() {
    const features = [
        {
            title: "Minimal UI",
            description: "Focus on content with a distraction-free, elegant interface."
        },
        {
            title: "Easy Publishing",
            description: "Effortlessly publish and manage your blog posts."
        },
        {
            title: "Open Source",
            description: "Built with transparency and community collaboration in mind."
        }
    ];

    return (
        <section className="w-[90%] mx-auto px-6 md:px-16 py-16 bg-gradient-to-br from-[#f5f7fa]/10 to-[#c3cfe2]/5 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl text-white font-inter mt-24">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                    About NotionBlog
                </h1>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-10">
                    NotionBlog is a modern blogging platform inspired by Notion's clean and minimal design. 
                    Our mission is to empower creators to share ideas, stories, and tutorials in a distraction-free environment.
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
                        >
                            <h2 className="text-xl font-semibold text-white mb-2">
                                {feature.title}
                            </h2>
                            <p className="text-gray-200 text-base">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
