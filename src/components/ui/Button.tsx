'use client';
import React from 'react';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  text?: string;
  className?: string;
};

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = ''
}: Props) => {
  let variantClasses = '';

  if (variant === 'primary') {
    variantClasses = 'bg-blue-600 text-white hover:bg-blue-700';
  } else if (variant === 'secondary') {
    variantClasses = 'bg-gray-600 text-white hover:bg-gray-700';
  } else if (variant === 'outline') {
    variantClasses = 'border border-gray-400 text-gray-800 hover:bg-gray-100';
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};
