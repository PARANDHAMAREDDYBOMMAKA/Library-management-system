import { NextResponse, NextRequest } from "next/server";
import prisma from "../../lib/prisma";
import logger from "../../utils/logger";

export async function GET(req: NextRequest) {
  logger.info("GET /api/overdue - Fetching overdue books");

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const overdueBooks = await prisma.issuance.findMany({
      where: {
        target_return_date: { lt: today },
        issuance_status: { not: "Returned" },
      },
      include: { book: true, member: true },
    });

    return NextResponse.json(overdueBooks);
  } catch (error) {
    logger.error(`ERROR /api/overdue - ${error}`);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}