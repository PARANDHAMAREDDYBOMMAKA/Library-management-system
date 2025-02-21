import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">
        Welcome to the Library Management System
      </h1>
      <p className="text-lg mt-4">
        Manage books, members, and issuances efficiently.
      </p>
      <Link href="/dashboard">
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded">
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
}
