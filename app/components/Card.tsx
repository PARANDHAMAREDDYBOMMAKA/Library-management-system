import React from "react";

type CardProps = {
  title: string;
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
};

export default Card;
