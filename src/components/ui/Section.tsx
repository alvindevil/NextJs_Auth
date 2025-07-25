import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export const Section = ({ children, className = '', id }: Props) => {
  return (
    <section id={id} className={`py-12 px-4 md:px-12 ${className}`}>
      {children}
    </section>
  );
};
