import React, { useState } from "react";

interface BookFormProps {
  onSubmit: (book: {
    book_name: string;
    book_publisher: string;
    book_cat_id: string;
    book_collection_id: string;
  }) => void;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit }) => {
  const [bookName, setBookName] = useState("");
  const [bookPublisher, setBookPublisher] = useState("");
  const [bookCatId, setBookCatId] = useState("");
  const [bookCollectionId, setBookCollectionId] = useState("");

  return (
    <form
      className="flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          book_name: bookName,
          book_publisher: bookPublisher,
          book_cat_id: bookCatId,
          book_collection_id: bookCollectionId,
        });
      }}
    >
      <input
        className="p-1 border border-gray-300 rounded w-1/4 m-2"
        type="text"
        placeholder="Book Name"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
      />
      <input
        className="p-1 border border-gray-300 rounded w-1/4 m-2"
        type="text"
        placeholder="Book Publisher"
        value={bookPublisher}
        onChange={(e) => setBookPublisher(e.target.value)}
      />
      <input
        className="p-1 border border-gray-300 rounded w-1/4 m-2"
        type="text"
        placeholder="Book Category ID"
        value={bookCatId}
        onChange={(e) => setBookCatId(e.target.value)}
      />
      <input
        className="p-1 border border-gray-300 rounded w-1/4 m-2"
        type="text"
        placeholder="Book Collection ID"
        value={bookCollectionId}
        onChange={(e) => setBookCollectionId(e.target.value)}
      />
      <button className="bg-blue-500 w-32 rounded-md p-2 m-2" type="submit">
        Add Book
      </button>
      <input
        className="p-1 border border-gray-300 rounded w-1/4 m-2"
        type="text"
        placeholder="Book Category ID"
        value={bookCatId}
        onChange={(e) => setBookCatId(e.target.value)}
      />
      <input
        className="p-1 border border-gray-300 rounded w-1/4 m-2"
        type="text"
        placeholder="Book Collection ID"
        value={bookCollectionId}
        onChange={(e) => setBookCollectionId(e.target.value)}
      />
      <button className="bg-blue-500 w-32 rounded-md p-2 m-2" type="submit">
        Add Book
      </button>
    </form>
  );
};

export default BookForm;
