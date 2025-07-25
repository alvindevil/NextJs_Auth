"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  scrollToId?: string; // optional: scroll to section ID
}

interface HeaderProps {
  title?: string;
  navigation?: NavItem[];
}

export const Header = ({
  title = "NotionBlog",
  navigation = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
}: HeaderProps) => {
  const pathname = usePathname();

  const handleScroll = (id: string | undefined, href: string) => (e: React.MouseEvent) => {
    if (id && pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          {title}
        </Link>
        <nav className="space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={handleScroll(item.scrollToId, item.href)}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
