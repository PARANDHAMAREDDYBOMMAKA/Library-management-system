import OverdueBooks from "./OverdueBooks";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Dashboard</h1>
      <OverdueBooks />
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-2xl font-bold">Quick Links</h2>
        <ul className="mt-2">
          <li className="mb-2">
            <Link href="/pages/books" className="text-blue-500 hover:underline">
              Manage Books
            </Link>
          </li>
          <li>
            <Link href="/pages/members" className="text-blue-500 hover:underline">
              Manage Members
            </Link>
          </li>
          <li>
            <Link href="/pages/issuances" className="text-blue-500 hover:underline">
              Manage Issuances
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
