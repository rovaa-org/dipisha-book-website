import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF7F7]">
      <div className="text-center px-4">
        <h1 className="text-6xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-serif text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          It seems this page has wandered off, much like a poem waiting to be
          found. Let&apos;s get you back to familiar verses.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-medium hover:from-pink-700 hover:to-purple-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}