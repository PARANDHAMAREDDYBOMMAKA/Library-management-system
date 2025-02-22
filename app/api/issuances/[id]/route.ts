import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { params } = await context;
  try {
    const issuance = await prisma.issuance.findUnique({
      where: { issuance_id: Number(params.id) }, 
      include: { book: true, member: true },
    });

    if (!issuance) return NextResponse.json({ error: "Issuance not found" }, { status: 404 });

    return NextResponse.json(issuance);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch issuance" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updatedIssuance = await prisma.issuance.update({
      where: { issuance_id: Number(params.id) },
      data: body,
    });

    return NextResponse.json(updatedIssuance);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update issuance" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.issuance.delete({
      where: { issuance_id: Number(params.id) },
    });

    return NextResponse.json({ message: "Issuance deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete issuance" }, { status: 400 });
  }
}
