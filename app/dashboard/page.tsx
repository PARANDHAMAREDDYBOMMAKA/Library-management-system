import OverdueBooks from "./OverdueBooks";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Dashboard
      </h1>

      {/* Overdue Books Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <OverdueBooks />
      </div>

      {/* Quick Links Section */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="pages/books">
            <div className="p-4 bg-blue-500 text-white font-medium text-center rounded-lg shadow hover:bg-blue-600 transition">
              Manage Books
            </div>
          </Link>
          <Link href="pages/members">
            <div className="p-4 bg-green-500 text-white font-medium text-center rounded-lg shadow hover:bg-green-600 transition">
              Manage Members
            </div>
          </Link>
          <Link href="pages/issuances">
            <div className="p-4 bg-red-500 text-white font-medium text-center rounded-lg shadow hover:bg-red-600 transition">
              Manage Issuances
            </div>
          </Link>

          <Link href="/analytics">
            <div className="p-4 bg-yellow-500 text-white font-medium text-center rounded-lg shadow hover:bg-yellow-600 transition">
              Analytics
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
