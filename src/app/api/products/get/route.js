import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.products.findMany();

    if (!products) {
      return NextResponse.json({ error: "product not found" }, { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while registering the user" },
      { status: 500 }
    );
  }
}
