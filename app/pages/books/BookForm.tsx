import React, { useState } from "react";

interface BookFormProps {
  onSubmit: (book: { book_name: string }) => void;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit }) => {
  const [bookName, setBookName] = useState("");

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit({ book_name: bookName }); }}>
      <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
