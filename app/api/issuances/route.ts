import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function GET(req: Request) {
  try {
    const issuances = await prisma.issuance.findMany({
      include: { book: true, member: true },
    });
    return NextResponse.json(issuances);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch issuances" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newIssuance = await prisma.issuance.create({ data: body });
    return NextResponse.json(newIssuance, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create issuance" }, { status: 400 });
  }
}
