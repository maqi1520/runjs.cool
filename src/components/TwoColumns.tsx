import React from "react";

export const TwoColumns: React.FC = ({ children }) => {
  return (
    <div className="md:grid md:grid-cols-2 divide-x divide-gray-200 dark:divide-neutral-800 divide-c md:min-h-screen">
      {children}
    </div>
  );
};

export const Column: React.FC<{
  title: string;
  renderRight?: () => React.ReactNode;
}> = ({ children, title, renderRight }) => {
  return (
    <div className="flex flex-col h-[300px] md:h-full">
      <header className="h-16 flex items-center justify-between flex-none p-5 border-b  border-gray-200 dark:border-neutral-800">
        <span className="font-medium text-xl">{title}</span>
        <div className="flex space-x-3 items-center">
          {renderRight && renderRight()}
        </div>
      </header>
      <div className="flex-auto">{children}</div>
    </div>
  );
};
