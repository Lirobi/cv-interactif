import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get JWT secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production";

export async function POST(request: Request) {
    const prisma = new PrismaClient();

    try {
        // Safely parse the request body
        let credentials;
        try {
            credentials = await request.json();
        } catch (e) {
            return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
        }

        const { username, password } = credentials;

        // Validate required fields
        if (!username || !password) {
            return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            // Use a generic error message to prevent username enumeration
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            // Use a generic error message to prevent username enumeration
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Generate JWT token with expiration
        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        const response = NextResponse.json({ message: "Authentication successful" }, { status: 200 });

        // Set HTTP-only cookie with the JWT token
        response.cookies.set("adminAuth", token, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400, // 24 hours in seconds
        });

        return response;
    } catch (error) {
        console.error("Authentication error:", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}





