import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import logger from "../../../utils/logger";

export async function GET() {
    logger.info("GET /api/outstanding - Fetching outstanding books");

    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const books = await prisma.issuance.findMany({
            where: {
                target_return_date: { lt: today },
                issuance_status: { not: "Returned" },
            },
            select: {
                member: { select: { mem_name: true } },
                book: { select: { book_name: true, book_publisher: true } },
                issuance_date: true,
                target_return_date: true,
            },
        });

        return NextResponse.json({ data: books });
    } catch (error) {
        logger.error(`ERROR /api/outstanding - ${error}`);
        return NextResponse.json({ error: "Failed to fetch overdue books" }, { status: 500 });
    }
}
