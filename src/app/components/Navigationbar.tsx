'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import AppsIcon from '@mui/icons-material/Apps';
import HistoryIcon from '@mui/icons-material/History';

export const Navbar: React.FC = () => {
  return (
    <div className="bg-[#13141f] text-white p-4 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Left: Logo */}
        <Link href="/spaces">
          <div className="flex items-center space-x-4">
            <Image
              src="/lwicon.svg"
              alt="user"
              width={46}
              height={46}
              priority
              className="object-cover"
            />
            <span className="text-lg font-semibold">Learning Wrapped</span>
          </div>
        </Link>
        {/* Center: Navigation Buttons */}
        <div className="flex items-center space-x-4">
          {[
            {
              href: '/spaces',
              icon: <HomeIcon fontSize="small" />,
              label: 'Home',
            },
            {
              href: '/chatbot',
              icon: <GroupIcon fontSize="small" />,
              label: 'Chat',
            },
            {
              href: '/spaces',
              icon: <AppsIcon fontSize="small" />,
              label: 'Spaces',
            },
            {
              href: '/404',
              icon: <HistoryIcon fontSize="small" />,
              label: 'History',
            },
          ].map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="flex items-center space-x-2 border-2 border-purple-500/20 bg-[#1b1c27] p-2 rounded-md hover:bg-purple-700 focus:outline-none"
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
        {/* Right: User Profile */}
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium p-4">Alysa Myers</span>
          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black font-medium">
            <Image
              src="/alyssa.png"
              alt="user"
              width={32}
              height={32}
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
