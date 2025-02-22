import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// GET handler
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // Await the params before using them
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const issuance = await prisma.issuance.findUnique({
      where: { issuance_id: Number(id) },
      include: { book: true, member: true },
    });

    if (!issuance)
      return NextResponse.json({ error: "Issuance not found" }, { status: 404 });

    return NextResponse.json(issuance);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch issuance" }, { status: 500 });
  }
}

// PUT handler
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const updatedIssuance = await prisma.issuance.update({
      where: { issuance_id: Number(id) },
      data: body,
    });

    return NextResponse.json(updatedIssuance);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update issuance" }, { status: 400 });
  }
}

// DELETE handler
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.issuance.delete({
      where: { issuance_id: Number(id) },
    });

    return NextResponse.json({ message: "Issuance deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete issuance" }, { status: 400 });
  }
}
