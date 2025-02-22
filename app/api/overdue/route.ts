import { NextResponse, NextRequest } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    const overdueBooks = await prisma.issuance.findMany({
      where: {
        target_return_date: {
          lt: today, // Overdue books (past due date)
        },
        issuance_status: { not: "Returned" }, // Ensure book is not returned
      },
      include: { book: true, member: true },
    });

    return NextResponse.json(overdueBooks);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
