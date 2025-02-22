// File: app/api/books/never-borrowed/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // Ensure correct import path

export async function GET() {
    try {
        const books = await prisma.book.findMany({
            where: {
                issuances: {
                    none: {}, // No associated issuances
                },
            },
            select: {
                book_name: true,
                book_publisher: true,
            },
        });

        return NextResponse.json({ data: books });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
    }
}
