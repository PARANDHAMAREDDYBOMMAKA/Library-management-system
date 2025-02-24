"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Analytics() {
  const router = useRouter(); // Initialize router

  interface NeverBorrowedBook {
    book_name: string;
    book_publisher: string;
  }

  interface OutstandingBook {
    member: {
      mem_name: string;
    };
    book: {
      book_name: string;
      book_publisher: string;
    };
    issuance_date: string;
    target_return_date: string;
  }

  interface TopBorrowedBook {
    book_name: string;
    timesBorrowed: number;
    uniqueBorrowers: number;
  }

  const [neverBorrowed, setNeverBorrowed] = useState<NeverBorrowedBook[]>([]);
  const [outstanding, setOutstanding] = useState<OutstandingBook[]>([]);
  const [topBorrowed, setTopBorrowed] = useState<TopBorrowedBook[]>([]);

  useEffect(() => {
    fetch("/api/books/never-borrowed")
      .then((res) => res.json())
      .then((data) => setNeverBorrowed(data.data));

    fetch("/api/books/outstanding")
      .then((res) => res.json())
      .then((data) => setOutstanding(data.data));

    fetch("/api/books/top-borrowed")
      .then((res) => res.json())
      .then((data) => setTopBorrowed(data.data));
  }, []);

  return (
    <div className="p-6">

      <button className="cursor-pointer"
        onClick={() => router.back()}
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">
        📊 Library Analytics
      </h1>

      {/* Books Never Borrowed */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          📌 Books Never Borrowed
        </h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-4 border border-gray-300 text-center">
                Book Name
              </th>
              <th className="p-4 border border-gray-300 text-center">
                Publisher
              </th>
            </tr>
          </thead>
          <tbody>
            {neverBorrowed.map((book, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="p-4 border border-gray-300 text-center">
                  {book.book_name}
                </td>
                <td className="p-4 border border-gray-300 text-center">
                  {book.book_publisher}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Outstanding Books */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          📌 Outstanding Books
        </h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-4 border border-gray-300 text-center">
                Member Name
              </th>
              <th className="p-4 border border-gray-300 text-center">
                Book Name
              </th>
              <th className="p-4 border border-gray-300 text-center">
                Issued Date
              </th>
              <th className="p-4 border border-gray-300 text-center">
                Return Date
              </th>
              <th className="p-4 border border-gray-300 text-center">
                Publisher
              </th>
            </tr>
          </thead>
          <tbody>
            {outstanding.map((book, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="p-4 border border-gray-300 text-center">
                  {book.member?.mem_name}
                </td>
                <td className="p-4 border border-gray-300 text-center">
                  {book.book?.book_name}
                </td>
                <td className="p-4 border border-gray-300 text-center">
                  {new Date(book.issuance_date).toLocaleDateString()}
                </td>
                <td className="p-4 border border-gray-300 text-center">
                  {new Date(book.target_return_date).toLocaleDateString()}
                </td>
                <td className="p-4 border border-gray-300 text-center">
                  {book.book?.book_publisher}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top 10 Most Borrowed Books */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          📌 Top 10 Most Borrowed Books
        </h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-4 border border-gray-300 text-center">
                Book Name
              </th>
              <th className="p-4 border border-gray-300 text-center">
                Times Borrowed
              </th>
              <th className="p-4 border border-gray-300 text-center">
                Unique Borrowers
              </th>
            </tr>
          </thead>
          <tbody>
            {topBorrowed.map((book, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="p-4 border border-gray-300 text-center">
                  {book.book_name}
                </td>
                <td className="p-4 border border-gray-300 text-center">
                  {book.timesBorrowed}
                </td>
                <td className="p-4 border border-gray-300 text-center">
                  {book.uniqueBorrowers}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
