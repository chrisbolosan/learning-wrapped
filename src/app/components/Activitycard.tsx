import React, { ReactNode } from 'react';

interface ActivityCardProps {
  title: string;
  icon: ReactNode;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  icon,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="bg-[#1a1b26] rounded-lg border-2 border-purple-500/20 p-6 flex flex-col items-center justify-center relative transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="absolute top-2 right-2">
        <button
          onClick={onToggleFavorite}
          className="text-purple-400 hover:scale-110 transition-transform"
        >
          <svg
            className="w-5 h-5"
            fill={isFavorite ? 'white' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>
      </div>
      <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
        {icon}
      </div>
      <span className="text-white text-center">{title}</span>
    </div>
  );
};
