import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: Request, context: { params: { id: string } }) {
  const { params } = await context;
  if (!params?.id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    const book = await prisma.book.findUnique({
      where: { book_id: Number(params.id) },
    });

    return book ? NextResponse.json(book) : NextResponse.json({ error: "Not Found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  if (!params?.id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    const body = await req.json();
    const updatedBook = await prisma.book.update({
      where: { book_id: Number(params.id) },
      data: body,
    });

    return NextResponse.json(updatedBook);
  } catch (error) {
    return NextResponse.json({ error: "Update Failed" }, { status: 400 });
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  if (!params?.id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    await prisma.book.delete({
      where: { book_id: Number(params.id) },
    });

    return NextResponse.json({ message: "Deleted Successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Deletion Failed" }, { status: 400 });
  }
}
