import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/spaces">
        <button className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border-2 border-purple-500 transition-all">
          <span className="mr-2 text-purple-500">&#8592;</span>
          Back
        </button>
      </Link>
    </div>
  );
}
