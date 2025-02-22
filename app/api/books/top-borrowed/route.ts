// File: app/api/books/top-borrowed/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
    try {
        const books = await prisma.issuance.groupBy({
            by: ["book_id"],
            _count: {
                book_id: true,
                issuance_member: true,
            },
            orderBy: {
                _count: {
                    book_id: "desc",
                },
            },
            take: 10,
        });

        const enrichedBooks = await Promise.all(
            books.map(async (b) => {
                const bookDetails = await prisma.book.findUnique({ where: { book_id: b.book_id } });
                return {
                    book_name: bookDetails?.book_name,
                    timesBorrowed: b._count.book_id,
                    uniqueBorrowers: b._count.issuance_member,
                };
            })
        );

        return NextResponse.json({ data: enrichedBooks });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch top books" }, { status: 500 });
    }
}
