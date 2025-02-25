import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import logger from "../../utils/logger";

export async function GET(req: Request) {
  logger.info("GET /api/members - Fetching all members");

  try {
    const members = await prisma.member.findMany();
    return NextResponse.json(members);
  } catch (error) {
    logger.error(`ERROR /api/members - ${error}`);
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  logger.info("POST /api/members - Creating a new member");

  try {
    const { mem_id, ...body } = await req.json();

    const newMember = await prisma.member.create({
      data: {
        mem_name: body.mem_name,
        mem_phone: body.mem_phone,
        mem_email: body.mem_email,
      },
    });

    logger.info(`SUCCESS /api/members - Member created with ID ${newMember.mem_id}`);
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    logger.error(`ERROR /api/members - ${error}`);
    return NextResponse.json({ error: "Failed to create member", details: error }, { status: 400 });
  }
}
