"use client";

import React from "react";

interface TextareaProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  rows?: number;
  disabled?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder = "Write something...",
  value,
  onChange,
  className = "",
  rows = 6,
  disabled = false,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      disabled={disabled}
      className={`
        w-full p-3 rounded-xl bg-white border border-gray-300 
        shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:border-blue-500 transition-all duration-200 resize-none
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
    />
  );
};

export default Textarea;
