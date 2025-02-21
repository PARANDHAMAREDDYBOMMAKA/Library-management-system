"use client"

import { useState, useEffect } from "react";

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
  const { data, loading, error } = useFetch("/api/issuances/overdue");

  if (loading) return <p>Loading overdue books...</p>;
  if (error) return <p>Error loading overdue books.</p>;

  return (
    <div className="mt-4 p-4 border rounded">
      <h2 className="text-xl font-bold">Overdue Books</h2>
      {data.length === 0 ? (
        <p>No overdue books.</p>
      ) : (
        <ul>
          {data.map((book: any) => (
            <li key={book.book_id}>{book.book_name} - Due: {book.due_date}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
