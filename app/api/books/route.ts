import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function GET(req: Request) {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newBook = await prisma.book.create({ data: body });
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create book" }, { status: 400 });
  }
}
