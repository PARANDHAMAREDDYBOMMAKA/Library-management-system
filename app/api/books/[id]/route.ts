import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import logger from "../../../utils/logger";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id) {
    logger.warn("GET /api/books - Invalid ID received");
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const book = await prisma.book.findUnique({
      where: { book_id: Number(id) },
    });

    if (book) {
      logger.info(`GET /api/books/${id} - Book found`);
      return NextResponse.json(book);
    } else {
      logger.warn(`GET /api/books/${id} - Book not found`);
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
  } catch (error) {
    const err = error as Error;
    logger.error(`GET /api/books/${id} - Error: ${err.message}`);
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id) {
    logger.warn("PUT /api/books - Invalid ID received");
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const updatedBook = await prisma.book.update({
      where: { book_id: Number(id) },
      data: body,
    });

    logger.info(`PUT /api/books/${id} - Book updated successfully`);
    return NextResponse.json(updatedBook);
  } catch (error) {
    const err = error as Error;
    logger.error(`PUT /api/books/${id} - Update Failed: ${err.message}`);
    return NextResponse.json({ error: "Update Failed" }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id) {
    logger.warn("DELETE /api/books - Invalid ID received");
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.book.delete({
      where: { book_id: Number(id) },
    });

    logger.info(`DELETE /api/books/${id} - Book deleted successfully`);
    return NextResponse.json({ message: "Deleted Successfully" });
  } catch (error) {
    const err = error as Error;
    logger.error(`DELETE /api/books/${id} - Deletion Failed: ${err.message}`);
    return NextResponse.json({ error: "Deletion Failed" }, { status: 400 });
  }
}
