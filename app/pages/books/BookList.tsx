import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useFetch = <T = any,>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
};

interface Book {
  book_name: string;
  book_publisher: string;
}

interface Book {
  book_name: string;
  book_publisher: string;
}

const BookList = ({ books }: { books: Book[] }) => {
  const { data, loading, error } = useFetch("/api/books");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold">Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.book_name}>
            {book.book_name} - {book.book_publisher}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
