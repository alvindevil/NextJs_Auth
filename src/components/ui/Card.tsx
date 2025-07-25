import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className = '' }: Props) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
};
