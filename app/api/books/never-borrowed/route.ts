import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import logger from "../../../utils/logger";

export async function GET() {
    logger.info("GET /api/never-borrowed - Fetching books that were never borrowed");

    try {
        const books = await prisma.book.findMany({
            where: {
                issuances: { none: {} },
            },
            select: { book_name: true, book_publisher: true },
        });

        return NextResponse.json({ data: books });
    } catch (error) {
        logger.error(`ERROR /api/never-borrowed - ${error}`);
        return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
    }
}
