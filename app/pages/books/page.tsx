"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BookList from "./BookList";
import BookForm from "./BookForm";
import { getBooks } from "../../services/books";
import { ArrowLeft } from "lucide-react";

export default function BooksPage() {
  const router = useRouter();
  const [books, setBooks] = useState<
    { book_name: string; book_publisher: string }[]
  >([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  const handleAddBook = (book: {
    book_name: string;
    book_publisher: string;
  }) => {
    setBooks((prevBooks) => [...prevBooks, book]);
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="w-5 h-5 cursor-pointer" />
        {/* <h1 className="text-2xl font-bold">Books</h1> */}
      </button>

     <div className="flex justify-end items-center mb-4">
     <button
        onClick={() => setShowModal(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Add Book
      </button>
     </div>

      <BookList books={books} />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            <BookForm onSubmit={handleAddBook} />
          </div>
        </div>
      )}
    </div>
  );
}
