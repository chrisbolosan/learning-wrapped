import React from 'react';
import Link from 'next/link';
import '../globals.css';

interface CourseCardProps {
  title: string;
  description?: string;
  imageSrc: string;
  isFavorite: boolean;
  urlSlug: string;
  onToggleFavorite: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  imageSrc,
  isFavorite,
  urlSlug,
  onToggleFavorite,
}) => {
  return (
    <div className="bg-[#1a1b26] rounded-lg overflow-hidden border border-blue-900/30 max-w-80">
      <Link href={`/courses/${urlSlug}`}>
        <button className="w-full btn-custom">Open</button>
      </Link>
      <div className="relative">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-[140px] object-cover"
        />
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 text-white hover:scale-110 transition-transform"
        >
          <svg
            className="w-5 h-5"
            fill={isFavorite ? 'white' : 'none'}
            stroke="white"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-white text-lg font-medium mb-2">{title}</h3>
        {description && (
          <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
        )}
      </div>
    </div>
  );
};
