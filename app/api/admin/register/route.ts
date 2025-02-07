import { NextResponse } from 'next/server';
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

interface User {
    username: string;
    password: string;
}

// In-memory database for demonstration purposes.
// NOTE: In production, use a persistent database.
let users: User[] = [];

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const userCount = await prisma.user.count();
        return NextResponse.json({ userCount });
    } catch (error) {
        console.error("Error getting user count:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}