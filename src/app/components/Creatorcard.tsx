import React from 'react';

interface CreatorCardProps {
  name: string;
  imageSrc: string;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ name, imageSrc }) => (
  <div className="bg-[#1a1b26] rounded-lg border border-purple-500/20 p-6 flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
    <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
      <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
    </div>
    <span className="text-white text-lg">{name}</span>
  </div>
);
