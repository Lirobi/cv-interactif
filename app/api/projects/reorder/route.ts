import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        // Parse the request body
        let body;
        try {
            body = await request.json();
        } catch (e) {
            return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
        }

        const { projects } = body;

        // Validate projects array
        if (!projects || !Array.isArray(projects)) {
            return NextResponse.json({ error: "Invalid projects data" }, { status: 400 });
        }

        // Validate each project in the array
        for (const project of projects) {
            // Check if project has required properties
            if (!project || typeof project !== 'object') {
                return NextResponse.json({ error: "Invalid project object" }, { status: 400 });
            }

            // Validate project ID
            if (!project.id || typeof project.id !== 'number') {
                return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
            }

            // Validate order
            if (project.order === undefined || typeof project.order !== 'number' || project.order < 0) {
                return NextResponse.json({ error: "Invalid project order" }, { status: 400 });
            }
        }

        // Verify all projects exist before updating
        const projectIds = projects.map(p => p.id);
        const existingProjects = await prisma.project.findMany({
            where: { id: { in: projectIds } },
            select: { id: true }
        });

        if (existingProjects.length !== projectIds.length) {
            return NextResponse.json({ error: "One or more projects not found" }, { status: 404 });
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
        console.error("Error reordering projects:", error instanceof Error ? error.message : String(error));
        return NextResponse.json(
            { error: 'Failed to reorder projects' },
            { status: 500 }
        );
    }
} 