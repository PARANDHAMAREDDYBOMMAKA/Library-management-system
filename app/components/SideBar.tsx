import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <ul>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/books">Books</Link></li>
        <li><Link href="/issuances">Issuances</Link></li>
        <li><Link href="/members">Members</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
