import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const { name, type, amount, price } = await request.json();

    // Validate data types
    if (
      typeof name !== "string" ||
      typeof type !== "string" ||
      typeof amount !== "number" ||
      typeof price !== "number"
    ) {
      return NextResponse.json(
        {
          error: "Invalid data types provided",
        },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!name.trim() || !type.trim() || !amount || !price) {
      return NextResponse.json(
        {
          error: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Validate positive numbers
    if (amount < 0 || price < 0) {
      return NextResponse.json(
        {
          error: "Amount and price must be positive numbers",
        },
        { status: 400 }
      );
    }

    // Insert into database
    const products = await prisma.products.create({
      data: {
        name: name.trim(),
        type: type.trim(),
        amount,
        price,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Server error:", error);

    // Check for Prisma-specific errors
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A product with these details already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "An error occurred while creating the product" },
      { status: 500 }
    );
  }
}
