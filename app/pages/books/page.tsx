"use client"

import BookList from "./BookList";
import BookForm from "./BookForm";
import { useEffect, useState } from "react";
import { getBooks } from "../../services/books";

export default function BooksPage() {
  const [books, setBooks] = useState<{ book_name: string; book_publisher: string }[]>([]);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  const handleAddBook = (book: { book_name: string; book_publisher: string }) => {
    setBooks((prevBooks) => [...prevBooks, book]);
  };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold">Books</h1>
      <BookForm onSubmit={handleAddBook} />
      <BookList books={books} />
    </div>
  );
}
