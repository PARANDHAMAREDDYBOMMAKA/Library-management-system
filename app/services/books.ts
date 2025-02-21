export const getBooks = async () => {
    const res = await fetch("/api/books");
    return res.json();
  };
  