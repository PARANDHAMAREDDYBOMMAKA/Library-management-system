"use client";

import React, { useState } from "react";

// Define props for BookForm to accept an onSubmit callback.
interface BookFormProps {
  onSubmit: (book: { book_name: string; book_publisher: string }) => void;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit }) => {
  const [bookName, setBookName] = useState("");
  const [bookPublisher, setBookPublisher] = useState("");
  const [bookCatId, setBookCatId] = useState("");
  const [bookCollectionId, setBookCollectionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const book = {
      book_name: bookName,
      book_publisher: bookPublisher,
      book_cat_id: Number(bookCatId),
      book_collection_id: Number(bookCollectionId),
    };

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error:", data.error);
        setMessage(`Error: ${data.error}`);
        setLoading(false);
        return;
      }

      console.log("Book added:", data);
      setMessage("Book added successfully!");

      // Call the parent onSubmit callback with the book's name and publisher.
      onSubmit({
        book_name: bookName,
        book_publisher: bookPublisher,
      });

      // Clear form fields.
      setBookName("");
      setBookPublisher("");
      setBookCatId("");
      setBookCollectionId("");
    } catch (error) {
      console.error("Failed to send request:", error);
      setMessage("Failed to add book. Check the console for more details.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Add a New Book</h2>
      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes("successfully") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          placeholder="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          placeholder="Book Publisher"
          value={bookPublisher}
          onChange={(e) => setBookPublisher(e.target.value)}
        />
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="number"
          placeholder="Book Category ID"
          value={bookCatId}
          onChange={(e) => setBookCatId(e.target.value)}
        />
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="number"
          placeholder="Book Collection ID"
          value={bookCollectionId}
          onChange={(e) => setBookCollectionId(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600 transition"
          type="submit"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
