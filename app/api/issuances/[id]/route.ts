import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  if (!params?.id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    const issuance = await prisma.issuance.findUnique({
      where: { issuance_id: Number(params.id) },
    });

    return issuance ? NextResponse.json(issuance) : NextResponse.json({ error: "Not Found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch issuance" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  if (!params?.id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    await prisma.issuance.delete({
      where: { issuance_id: Number(params.id) },
    });

    return NextResponse.json({ message: "Deleted Successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Deletion Failed" }, { status: 400 });
  }
}
