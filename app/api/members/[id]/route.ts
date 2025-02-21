import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  if (!params?.id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    const member = await prisma.member.findUnique({
      where: { mem_id: Number(params.id) },
    });

    return member ? NextResponse.json(member) : NextResponse.json({ error: "Not Found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch member" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  if (!params?.id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    const body = await req.json();
    const updatedMember = await prisma.member.update({
      where: { mem_id: Number(params.id) },
      data: body,
    });

    return NextResponse.json(updatedMember);
  } catch (error) {
    return NextResponse.json({ error: "Update Failed" }, { status: 400 });
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  if (!params?.id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    await prisma.member.delete({
      where: { mem_id: Number(params.id) },
    });

    return NextResponse.json({ message: "Deleted Successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Deletion Failed" }, { status: 400 });
  }
}
