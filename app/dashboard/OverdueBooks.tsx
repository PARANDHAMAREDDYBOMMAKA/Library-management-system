"use client";

import { useState, useEffect } from "react";

interface OverdueBook {
  issuance_id: number; // Add unique issuance_id
  book: {
    book_id: number;
    book_name: string;
  };
  member: {
    mem_name: string;
  };
  target_return_date: string;
}

export function useFetch<T = any>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data: T) => {
        setData(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

export default function OverdueBooks() {
  const { data, loading, error } = useFetch<OverdueBook[]>("/api/overdue");

  if (loading) return <p>Loading overdue books...</p>;
  if (error) return <p>Error loading overdue books.</p>;

  return (
    <div className="mt-4 p-4 border rounded flex flex-col justify-between text-left">
      <h2 className="text-2xl font-bold">Overdue Books</h2>
      <p className="text-sm text-gray-600">
        List of books that are overdue for return.
      </p>
      {data && data.length === 0 ? (
        <p>No overdue books.</p>
      ) : (
        <ul className="pl-5 space-y-2 ">
          {data?.map((entry) => (
            <li
              key={entry.issuance_id}
              className="mb-2 flex justify-between items-center"
            >
              <span className="font-semibold">{entry.book.book_name}</span>
              <span className="text-red-500">
                Due: {new Date(entry.target_return_date).toLocaleDateString()}
              </span>
              <span className="text-gray-700">
                Borrower: {entry.member.mem_name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
