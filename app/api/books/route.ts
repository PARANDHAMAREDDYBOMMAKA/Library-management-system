import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function GET(req: Request) {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { book_id, ...bookData } = body;

    if (!bookData.book_name || !bookData.book_cat_id || !bookData.book_collection_id || !bookData.book_publisher) {
      return NextResponse.json({ error: "Missing required book fields" }, { status: 400 });
    }

    const newBook = await prisma.book.create({ data: bookData });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Duplicate entry detected" }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to create book" }, { status: 500 });
  }
}
