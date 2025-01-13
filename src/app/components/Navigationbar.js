import Link from 'next/link';

export const Navbar = () => {
  return (
    <div className="bg-[#13141f] text-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-4">
          <div className="bg-purple-500 w-8 h-8 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">M</span>
          </div>
          <span className="text-lg font-semibold">Learning Wrapped</span>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/spaces" className="text-gray-400 hover:text-white">
            Home
          </Link>
          <Link href="/spaces" className="text-gray-400 hover:text-white">
            Assistants
          </Link>
          <Link
            href="/spaces"
            className="text-white border-b-2 border-purple-500"
          >
            Spaces
          </Link>
          <Link href="/spaces" className="text-gray-400 hover:text-white">
            History
          </Link>
        </div>

        {/* Right: User Profile */}
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Alysa Myers</span>
          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black font-medium">
            <image src="/alyssa.png" alt="user" />
          </div>
        </div>
      </div>
    </div>
  );
};
