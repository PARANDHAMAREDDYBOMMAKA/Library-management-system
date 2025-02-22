// File: app/api/books/outstanding/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
    try {
        const books = await prisma.issuance.findMany({
            where: {
                target_return_date: {
                    gte: new Date(), // Books that are still issued
                },
            },
            select: {
                member: {
                    select: { mem_name: true },
                },
                book: {
                    select: { book_name: true, book_publisher: true },
                },
                issuance_date: true,
                target_return_date: true,
            },
        });

        return NextResponse.json({ data: books });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch outstanding books" }, { status: 500 });
    }
}
