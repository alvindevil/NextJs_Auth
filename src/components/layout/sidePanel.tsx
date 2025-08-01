"use client";

import React, { useState } from "react";
import { MdArrowDropDown } from 'react-icons/md';
import { BsChevronDown } from 'react-icons/bs';

interface Blog {
  _id: string;
  title: string;
}

interface CustomItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface SidePanelProps {
  blogs: Blog[];
  setShowBlogs: (value: boolean) => void;
  handleOpenBlog: (blog: Blog) => void;
  handleFetchBlogs?: () => void;
  title?: string;
  className?: string;
  customItems?: CustomItem[]; // 🔹 Optional custom items
}

export default function SidePanel({
  blogs,
  setShowBlogs,
  handleOpenBlog,
   handleFetchBlogs,
  title = "Your Pages",
  className = "",
  customItems = [], // default to empty
}: SidePanelProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={`w-full md:w-64 bg-white shadow-md h-full p-4 border-r border-gray-200 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ul className="space-y-2">

        {/* 🔹 Render any custom items passed from parent */}
        {customItems.map((item, index) => (
          <li
            key={index}
            className={`cursor-pointer flex items-center space-x-2 text-gray-700 hover:text-blue-600 ${item.className || ""}`}
            onClick={item.onClick}
          >
            {item.icon && <span>{item.icon}</span>}
            <span>{item.label}</span>
          </li>
        ))}

        {/* 📄 New Page */}
        <li
        className="text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer rounded-md border-none w-fit py-2 px-5"
        onClick={() => setShowBlogs(false)}
        >
            New Page
        </li>


        {/* 📚 History */}
        <li
          className="text-gray-700 hover:text-blue-600 cursor-pointer"
          onClick={() => {
            if (blogs.length > 0) handleOpenBlog(blogs[0]);
          }}
        >
          📚 History
        </li>

        <li
  className="text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer font-semibold mt-4 rounded-md px-5 py-2 flex items-center justify-between w-fit gap-2"
  onClick={async () => {
    if (blogs.length === 0 && handleFetchBlogs) {
      await handleFetchBlogs();
    }
    setShowDropdown(!showDropdown);
  }}
>
  <span className="flex items-center gap-2">
    Your Blogs
    <BsChevronDown
      className={`h-4 w-4 transition-transform duration-300 ${
        showDropdown ? "rotate-180" : "rotate-0"
      } text-white`}
    />
  </span>
</li>


        {showDropdown && (
          <ul className="space-y-1">
            {blogs.map((blog) => (
              <li
                key={blog._id}
                className="text-gray-600 p-2 border-2 rounded  hover:bg-blue-100 hover:text-black hover:font-bold cursor-pointer text-sm truncate"
                onClick={() => handleOpenBlog(blog)}
              >
                {blog.title.replace(/^\s*\w/, (c) => c.toUpperCase())}
              </li>
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
}
