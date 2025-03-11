import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            where: { visible: true }
        });

        return NextResponse.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        // Creating an empty project; defaults will be applied.
        const project = await prisma.project.create({
            data: {}, // relies on default values
        });
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
} 