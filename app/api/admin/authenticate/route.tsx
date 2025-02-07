import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";


export async function POST(request: Request) {
    const prisma = new PrismaClient();
    const { username, password } = await request.json();

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = user.id.toString(); // Generate token from user ID
    const response = NextResponse.json({ message: "Authentication successful" }, { status: 200 });
    response.cookies.set("adminAuth", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });


    return response;
}





