"use client";

import React from "react";

interface Book {
  book_name: string;
  book_publisher: string;
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  if (books.length === 0) {
    return <p className="text-center text-gray-600">No books available.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Book List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Book Name</th>
            <th className="border p-2 text-left">Publisher</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="border p-2">{book.book_name}</td>
              <td className="border p-2">{book.book_publisher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
