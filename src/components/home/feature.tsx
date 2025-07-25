import React from "react";

const features = [
  {
    title: "Notion-Powered Content",
    description:
      "Write and manage your blog posts directly in Notion. Sync updates instantly to your website.",
    icon: "📝",
  },
  {
    title: "Hybrid Markdown & Rich Media",
    description:
      "Support for Markdown, images, embeds, and more for flexible, beautiful posts.",
    icon: "🌐",
  },
  {
    title: "Fast & SEO-Friendly",
    description:
      "Optimized for speed and search engines to help your content reach more readers.",
    icon: "⚡",
  },
  {
    title: "Customizable Design",
    description:
      "Easily tweak layouts, colors, and typography to match your personal brand.",
    icon: "🎨",
  },
];

export default function Features() {
  return (
    <section className="w-full bg-[#fafbfc] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Features
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
