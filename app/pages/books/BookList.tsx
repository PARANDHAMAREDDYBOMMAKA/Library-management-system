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
    return (
      <p className="text-center text-gray-500 text-lg">No books available.</p>
    );
  }

  return (
    <div className="w-full mt-6 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Book List
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="bg-gray-500 text-white">
              <th className="p-4 text-left">Book Name</th>
              <th className="p-4 text-left">Publisher</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr
                key={index}
                className="border-b last:border-none hover:bg-blue-50 transition"
              >
                <td className="p-4">{book.book_name}</td>
                <td className="p-4">{book.book_publisher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
