import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Library Management</h1>
      <div className="space-x-4">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/books" className="hover:underline">Books</Link>
        <Link href="/issuances" className="hover:underline">Issuances</Link>
        <Link href="/members" className="hover:underline">Members</Link>
      </div>
    </nav>
  );
};

export default Header;
