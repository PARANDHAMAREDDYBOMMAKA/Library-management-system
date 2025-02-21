import OverdueBooks from "./OverdueBooks";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <OverdueBooks />
      <div className="mt-6">
        <h2 className="text-xl font-bold">Quick Links</h2>
        <ul className="mt-2">
          <li>
            <Link href="/books" className="text-blue-500">
              Manage Books
            </Link>
          </li>
          <li>
            <Link href="/members" className="text-blue-500">
              Manage Members
            </Link>
          </li>
          <li>
            <Link href="/issuances" className="text-blue-500">
              Manage Issuances
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
