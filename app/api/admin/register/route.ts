import { NextResponse } from 'next/server';
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";


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

        // Validate required fields.
        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
        }

        // Block registration if a user already exists.
        if (users.length >= 1) {
            return NextResponse.json({ error: 'User registration is disabled' }, { status: 400 });
        }

        // Optionally, hash the password before storing.
        // For example, using bcrypt:
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });

        // For demonstration, store the password as plain text.
        users.push({ username, password });

        const prisma = new PrismaClient();
        await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        // Create a response and set a secure cookie for authentication.
        const response = NextResponse.json({ message: 'Registration successful' }, { status: 200 });
        response.cookies.set('adminAuth', 'my-secure-admin-token', {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });
        return response;
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    const prisma = new PrismaClient();
    const userCount = await prisma.user.count();
    return NextResponse.json({ userCount });
}