import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        // Parse the request body
        const body = await request.json();
        const { projects } = body;

        if (!projects || !Array.isArray(projects)) {
            return NextResponse.json({ error: "Invalid projects data" }, { status: 400 });
        }

        // Update each project's order in the database
        const updatePromises = projects.map(project =>
            prisma.project.update({
                where: { id: project.id },
                data: { order: project.order }
            })
        );

        // Execute all updates in parallel
        await Promise.all(updatePromises);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error reordering projects:", error);
        return NextResponse.json(
            { error: 'Failed to reorder projects' },
            { status: 500 }
        );
    }
} 