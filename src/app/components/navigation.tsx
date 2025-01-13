'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Avatar,
  Box,
} from '@mui/material';
import {
  Home,
  Search,
  History,
  ArrowBack,
  Group,
  Apps,
} from '@mui/icons-material';

const Navigation = () => {
  const pathname = usePathname();

  interface NavLinkProps {
    href: string;
    icon: React.ElementType;
    text: string;
  }

  const NavLink = ({ href, icon: Icon, text }: NavLinkProps) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`
          flex items-center gap-2 px-3 py-1 rounded-lg transition-colors
          ${
            isActive
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }
        `}
      >
        <Icon fontSize="small" />
        <span className="text-sm">{text}</span>
      </Link>
    );
  };

  return (
    <AppBar position="static" className="bg-[#1a1625] shadow-none">
      <Toolbar className="justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="text-white text-sm">Learning Wrapped</span>
          </Link>

          <IconButton
            onClick={() => window.history.back()}
            className="text-gray-400 hover:text-white"
            size="small"
          >
            <ArrowBack fontSize="small" />
          </IconButton>
        </div>

        <Box className="flex items-center gap-6">
          <Box className="flex items-center gap-4">
            <NavLink href="/" icon={Home} text="Home" />
            <NavLink href="#" icon={Group} text="Assistants" />
            <NavLink href="/spaces" icon={Apps} text="Spaces" />
            <NavLink href="#" icon={History} text="History" />
          </Box>

          <Box className="flex items-center gap-4">
            <Box className="relative flex items-center">
              <Search
                className="text-gray-400 absolute left-3"
                fontSize="small"
              />
              <InputBase
                placeholder="Search for a space"
                className="bg-[#2a2435] text-white font-bold text-sm pl-10 pr-4 py-1 rounded-lg w-64"
                sx={{
                  '& .MuiInputBase-input': {
                    '&::placeholder': {
                      color: 'white',
                    },
                  },
                }}
              />
            </Box>

            <Avatar
              className="w-8 h-8 bg-gray-600"
              sx={{ width: 32, height: 32 }}
            >
              A
            </Avatar>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
