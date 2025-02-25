import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import logger from "../../utils/logger";

export async function GET() {
  logger.info("GET /api/issuances - Fetching all issuances");

  try {
    const issuances = await prisma.issuance.findMany({
      include: { book: true, member: true },
    });

    return NextResponse.json(issuances);
  } catch (error) {
    logger.error(`ERROR /api/issuances - ${error}`);
    return NextResponse.json({ error: "Failed to fetch issuances" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  logger.info("POST /api/issuances - Creating a new issuance");

  try {
    const body = await req.json();
    const { book_id, issuance_member, issued_by, target_return_date, issuance_status } = body;

    if (!book_id || !issuance_member || !issued_by || !target_return_date || !issuance_status) {
      logger.error("ERROR /api/issuances - Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newIssuance = await prisma.issuance.create({
      data: {
        book_id,
        issuance_member,
        issued_by,
        issuance_status,
        issuance_date: new Date(),
        target_return_date: new Date(target_return_date),
      },
    });

    logger.info(`SUCCESS /api/issuances - Issuance created with ID ${newIssuance.issuance_id}`);
    return NextResponse.json(newIssuance, { status: 201 });
  } catch (error) {
    logger.error(`ERROR /api/issuances - ${error}`);
    return NextResponse.json({ error: "Failed to create issuance", details: error }, { status: 400 });
  }
}
