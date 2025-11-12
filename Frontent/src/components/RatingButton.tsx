import React from 'react';

interface RatingButtonProps {
  label: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  onClick: () => void;
}

export const RatingButton: React.FC<RatingButtonProps> = ({ label, icon, color, hoverColor, onClick }) => {
  return (
    <div className="flex flex-col items-center gap-4 group">
      <button
        onClick={onClick}
        className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center text-white transition-all duration-300 ease-in-out transform group-hover:scale-110 focus:outline-none focus:ring-4 focus:ring-opacity-50 focus:ring-white ${color} ${hoverColor}`}
      >
        <div className="w-20 h-20 md:w-24 md:h-24">
          {icon}
        </div>
      </button>
      <span className="text-xl md:text-2xl font-semibold uppercase tracking-wider text-gray-300 group-hover:text-white transition-colors">
        {label}
      </span>
    </div>
  );
};
