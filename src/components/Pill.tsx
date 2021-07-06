import React from "react";

export const Pill: React.FC = ({ children }) => {
  return (
    <span className="inline-block text-xs bg-blue-100 py-1 px-3 mr-2 font-semibold shadow-xs rounded-full">
      {children}
    </span>
  );
};
