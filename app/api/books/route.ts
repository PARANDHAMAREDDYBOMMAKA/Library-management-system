import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import logger from "../../utils/logger";

// Fetch all books
export async function GET() {
  logger.info("GET /api/books - Fetching all books");

  try {
    const books = await prisma.book.findMany({
      include: {
        category: true,
        collection: true,
      },
    });

    return NextResponse.json(books, { status: 200 });
  } catch (error: any) {
    logger.error(`ERROR /api/books - ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create a new book
export async function POST(req: Request) {
  logger.info("POST /api/books - Creating a new book");

  try {
    const body = await req.json();
    const { book_name, book_publisher, book_cat_id, book_collection_id } = body;

    if (!book_name || !book_publisher || !book_cat_id || !book_collection_id) {
      logger.error("ERROR /api/books - Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newBook = await prisma.book.create({
      data: {
        book_name,
        book_publisher,
        book_cat_id: Number(book_cat_id),
        book_collection_id: Number(book_collection_id),
      },
    });

    logger.info(`SUCCESS /api/books - Book created with ID ${newBook.book_id}`);
    return NextResponse.json(newBook, { status: 201 });
  } catch (error: any) {
    logger.error(`ERROR /api/books - ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Delete a book by ID
export async function DELETE(req: Request) {
  logger.info("DELETE /api/books - Deleting a book");

  try {
    const { book_id } = await req.json();

    if (!book_id) {
      logger.error("ERROR /api/books - Book ID is required");
      return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
    }

    await prisma.book.delete({
      where: { book_id: Number(book_id) },
    });

    logger.info(`SUCCESS /api/books - Book with ID ${book_id} deleted`);
    return NextResponse.json({ message: "Book deleted successfully" }, { status: 200 });
  } catch (error: any) {
    logger.error(`ERROR /api/books - ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
