"use client";

import { useState, useEffect } from "react";

interface OverdueBook {
  issuance_id: number;
  book: {
    book_id: number;
    book_name: string;
  };
  member: {
    mem_name: string;
  };
  target_return_date: string;
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T = any>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url, {
      headers: {
        "x-api-key":
          process.env.NEXT_PUBLIC_API_KEY || "your_secure_api_key_here",
      },
    })
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
  const [filterDate, setFilterDate] = useState<string>("");

  if (loading) return <p>Loading overdue books...</p>;
  if (error) return <p>Error loading overdue books.</p>;

  const filteredData = data?.filter((book) =>
    filterDate
      ? new Date(book.target_return_date).toISOString().split("T")[0] ===
        filterDate
      : true
  );

  return (
    <div className="mt-4 p-4 border rounded text-left">
      <h2 className="text-2xl font-bold">Overdue Books</h2>
      <p className="text-sm text-gray-600">
        List of books that are overdue for return.
      </p>

      <div className="my-4">
        <label className="block text-sm font-semibold">
          Filter by Due Date:
        </label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="mt-1 p-2 border rounded"
        />
      </div>

      {filteredData && filteredData.length === 0 ? (
        <p>No overdue books found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Book Name</th>
              <th className="border p-2">Borrower</th>
              <th className="border p-2">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((entry) => (
              <tr key={entry.issuance_id} className="text-center">
                <td className="border p-2">{entry.book.book_name}</td>
                <td className="border p-2">{entry.member.mem_name}</td>
                <td className="border p-2 text-red-500">
                  {new Date(entry.target_return_date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
