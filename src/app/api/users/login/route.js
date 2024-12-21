import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    // mengambil data username dan password dari form login user
    const { email, password } = await req.json();

    //logika sederhana jika field username dan password kosong
    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    //ambil data user dari prisma
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    //logika jika user tidak ada maka return user not found dengan status 404
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    //validasi password dari bycrpt
    const isValidPassword = await bcrypt.compare(password, user.password);

    //logika jika password salah maka return password salah dengan status 401
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    //logika jika password benar maka return user dengan status 200
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while registering the user" },
      { status: 500 }
    );
  }
}
