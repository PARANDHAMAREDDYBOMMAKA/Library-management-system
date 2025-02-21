import BookList from "./BookList";
import BookForm from "./BookForm";

export default function BooksPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Books</h1>
      <BookForm onSubmit={(book) => console.log(book)} />
      <BookList books={[]} />
    </div>
  );
}
