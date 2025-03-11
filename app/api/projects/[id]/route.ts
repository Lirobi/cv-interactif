// @ts-nocheck
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Project } from "@/lib/types/Project";

export async function PUT(
    request: Request,
    { params }: Params
) {
    try {
        const projectId = params.id;

        // Safely parse the request body
        let projectData;
        try {
            projectData = await request.json();
        } catch (e) {
            return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
        }

        // Validate that projectData is not null or undefined
        if (!projectData) {
            return NextResponse.json({ error: "Missing project data" }, { status: 400 });
        }

        // Convert string ID to number if your database uses numeric IDs
        const numericId = parseInt(projectId, 10);

        // Extract only the fields that exist in the Prisma schema
        const { name, coverImg, desc, githubUrl, visible, tags, appUrl } = projectData;

        // Create a clean data object with only valid fields
        const cleanData = {
            name,
            coverImg,
            desc,
            githubUrl,
            visible,
            tags,
            appUrl
        };

        // Update the project
        const updatedProject = await prisma.project.update({
            where: { id: numericId },
            data: cleanData
        });

        return NextResponse.json(updatedProject);
    } catch (error) {
        // Safer error logging that handles null/undefined errors
        console.error("Error updating project:", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}