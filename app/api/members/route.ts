import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function GET(req: Request) {
  try {
    const members = await prisma.member.findMany();
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newMember = await prisma.member.create({ data: body });
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create member" }, { status: 400 });
  }
}
