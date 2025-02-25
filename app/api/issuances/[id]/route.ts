import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import logger from "../../../utils/logger";

// GET handler
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  logger.info(`GET /api/issuances/${id} - Fetching issuance details`);

  if (!id) {
    logger.error(`GET /api/issuances/${id} - Invalid ID`);
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const issuance = await prisma.issuance.findUnique({
      where: { issuance_id: Number(id) },
      include: { book: true, member: true },
    });

    if (issuance) {
      logger.info(`GET /api/issuances/${id} - Issuance found`);
      return NextResponse.json(issuance);
    } else {
      logger.warn(`GET /api/issuances/${id} - Issuance not found`);
      return NextResponse.json(
        { error: "Issuance not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    logger.error(
      `GET /api/issuances/${id} - Failed to fetch issuance: ${error}`
    );
    return NextResponse.json(
      { error: "Failed to fetch issuance" },
      { status: 500 }
    );
  }
}

// PUT handler
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  logger.info(`PUT /api/issuances/${id} - Updating issuance`);

  if (!id) {
    logger.error(`PUT /api/issuances/${id} - Invalid ID`);
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const updatedIssuance = await prisma.issuance.update({
      where: { issuance_id: Number(id) },
      data: body,
    });
    logger.info(`PUT /api/issuances/${id} - Issuance updated successfully`);
    return NextResponse.json(updatedIssuance);
  } catch (error) {
    logger.error(
      `PUT /api/issuances/${id} - Failed to update issuance: ${error}`
    );
    return NextResponse.json(
      { error: "Failed to update issuance" },
      { status: 400 }
    );
  }
}

// DELETE handler
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  logger.info(`DELETE /api/issuances/${id} - Deleting issuance`);

  if (!id) {
    logger.error(`DELETE /api/issuances/${id} - Invalid ID`);
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.issuance.delete({
      where: { issuance_id: Number(id) },
    });
    logger.info(`DELETE /api/issuances/${id} - Issuance deleted successfully`);
    return NextResponse.json({
      message: "Issuance deleted successfully",
    });
  } catch (error) {
    logger.error(
      `DELETE /api/issuances/${id} - Failed to delete issuance: ${error}`
    );
    return NextResponse.json(
      { error: "Failed to delete issuance" },
      { status: 400 }
    );
  }
}
