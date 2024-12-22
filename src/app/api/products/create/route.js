import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    //membuat produk diamond dengan harga
    const { name, type, amount, price } = await request.json();

    //validasi sederhana jika field kosong (NANTI UBAH INI YA ANJENK)
    if (!name || !type || !amount || !price) {
      return NextResponse.json({
        error: "All fields are required",
      });
    }

    const products = await prisma.products.create({
      data: {
        name,
        type,
        amount,
        price,
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the product" },
      { status: 500 }
    );
  }
}
