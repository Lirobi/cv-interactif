import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

// Get JWT secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production";

// Convert string to Uint8Array for jose
const getSecretKey = () => {
    return new TextEncoder().encode(JWT_SECRET);
};

// Verify JWT token
async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, getSecretKey());
        return payload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            where: { visible: true },
            orderBy: { order: 'asc' }
        });

        return NextResponse.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error instanceof Error ? error.message : String(error));
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        // Check authentication
        const cookieStore = await cookies();
        const adminAuth = cookieStore.get('adminAuth')?.value;

        if (!adminAuth) {
            // Check Authorization header as fallback
            const authHeader = request.headers.get('authorization');
            const token = authHeader?.split(' ')[1];

            if (!token) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }

            // Verify the token
            const payload = await verifyToken(token);
            if (!payload) {
                return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
            }
        } else {
            // Verify the token from cookie
            const payload = await verifyToken(adminAuth);
            if (!payload) {
                return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
            }
        }

        // Get the highest order value to place the new project at the end
        const highestOrderProject = await prisma.project.findFirst({
            orderBy: { order: 'desc' }
        });

        const nextOrder = highestOrderProject ? highestOrderProject.order + 1 : 0;

        // Creating a project with default values and proper order
        const project = await prisma.project.create({
            data: {
                name: "New Project",
                desc: "",
                visible: false,
                order: nextOrder
            }
        });

        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error("Error creating project:", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
} 