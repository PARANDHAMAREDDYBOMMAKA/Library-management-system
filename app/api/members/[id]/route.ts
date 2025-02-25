import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import logger from "../../../utils/logger";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  logger.info(`GET /api/members/${id} - Fetching member details`);

  if (!id) {
    logger.error(`GET /api/members/${id} - Invalid ID`);
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const member = await prisma.member.findUnique({
      where: { mem_id: Number(id) },
    });
    if (member) {
      logger.info(`GET /api/members/${id} - Member found`);
      return NextResponse.json(member);
    } else {
      logger.warn(`GET /api/members/${id} - Member not found`);
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
  } catch (error) {
    logger.error(`GET /api/members/${id} - Failed to fetch member: ${error}`);
    return NextResponse.json(
      { error: "Failed to fetch member" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  logger.info(`PUT /api/members/${id} - Updating member`);

  if (!id) {
    logger.error(`PUT /api/members/${id} - Invalid ID`);
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const updatedMember = await prisma.member.update({
      where: { mem_id: Number(id) },
      data: body,
    });
    logger.info(`PUT /api/members/${id} - Member updated successfully`);
    return NextResponse.json(updatedMember);
  } catch (error) {
    logger.error(`PUT /api/members/${id} - Update Failed: ${error}`);
    return NextResponse.json({ error: "Update Failed" }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  logger.info(`DELETE /api/members/${id} - Deleting member`);

  if (!id) {
    logger.error(`DELETE /api/members/${id} - Invalid ID`);
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.member.delete({
      where: { mem_id: Number(id) },
    });
    logger.info(`DELETE /api/members/${id} - Member deleted successfully`);
    return NextResponse.json({ message: "Deleted Successfully" });
  } catch (error) {
    logger.error(`DELETE /api/members/${id} - Deletion Failed: ${error}`);
    return NextResponse.json({ error: "Deletion Failed" }, { status: 400 });
  }
}
