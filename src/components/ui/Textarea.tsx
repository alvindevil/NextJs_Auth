'use client';
import React from 'react';

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
};

export const Textarea = ({
  placeholder,
  value,
  onChange,
  className = ''
}: Props) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={6}
      className={`w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};
