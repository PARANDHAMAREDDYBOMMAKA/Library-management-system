import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import logger from "../../../utils/logger";

export async function GET() {
    logger.info("GET /api/top-borrowed - Fetching top 10 most borrowed books");

    try {
        const books = await prisma.issuance.groupBy({
            by: ["book_id"],
            _count: {
                book_id: true,
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
                const bookDetails = await prisma.book.findUnique({
                    where: { book_id: b.book_id },
                    select: { book_name: true, book_publisher: true },
                });

                return {
                    book_name: bookDetails?.book_name,
                    book_publisher: bookDetails?.book_publisher,
                    timesBorrowed: b._count.book_id,
                };
            })
        );

        return NextResponse.json({ data: enrichedBooks });
    } catch (error) {
        logger.error(`ERROR /api/top-borrowed - ${error}`);
        return NextResponse.json({ error: "Failed to fetch top books" }, { status: 500 });
    }
}
