import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Library Management
        </h1>
      </div>
      <nav className="w-full bg-white/30 backdrop-blur-md shadow-md p-4 flex justify-center space-x-6 rounded-lg mt-3 mb-6">
        <Link href="/dashboard">
          <span className="px-4 py-2 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition cursor-pointer">
            Dashboard
          </span>
        </Link>
        <Link href="/pages/books">
          <span className="px-4 py-2 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition cursor-pointer">
            Manage Books
          </span>
        </Link>
        <Link href="/pages/members">
          <span className="px-4 py-2 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition cursor-pointer">
            Manage Members
          </span>
        </Link>
        <Link href="/pages/issuances">
          <span className="px-4 py-2 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition cursor-pointer">
            Manage Issuances
          </span>
        </Link>
        <Link href="/analytics">
          <span className="px-4 py-2 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition cursor-pointer">
            Analytics
          </span>
        </Link>
      </nav>
    </div>
  );
}
