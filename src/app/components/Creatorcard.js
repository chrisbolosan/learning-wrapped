import React from 'react';
export const CreatorCard = ({ name, imageSrc }) => (
  <div className="bg-[#1a1b26] rounded-lg border border-purple-500/20 p-6 flex flex-col items-center justify-center">
    <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
      <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
    </div>
    <span className="text-white text-lg">{name}</span>
  </div>
);
