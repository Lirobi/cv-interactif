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
        // Validate project ID
        const projectId = params.id;
        if (!projectId || !/^\d+$/.test(projectId)) {
            return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
        }

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

        // Validate the project exists before updating
        const existingProject = await prisma.project.findUnique({
            where: { id: numericId }
        });

        if (!existingProject) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        // Extract only the fields that exist in the Prisma schema
        const { name, coverImg, desc, githubUrl, visible, tags, appUrl } = projectData;

        // Validate and sanitize input fields
        const cleanData: Record<string, any> = {};

        if (name !== undefined) {
            if (typeof name !== 'string' || name.length > 255) {
                return NextResponse.json({ error: "Invalid name field" }, { status: 400 });
            }
            cleanData.name = name;
        }

        if (coverImg !== undefined) {
            if (typeof coverImg !== 'string' || coverImg.length > 1000) {
                return NextResponse.json({ error: "Invalid coverImg field" }, { status: 400 });
            }
            cleanData.coverImg = coverImg;
        }

        if (desc !== undefined) {
            if (typeof desc !== 'string') {
                return NextResponse.json({ error: "Invalid desc field" }, { status: 400 });
            }
            cleanData.desc = desc;
        }

        if (githubUrl !== undefined) {
            if (typeof githubUrl !== 'string' || githubUrl.length > 1000) {
                return NextResponse.json({ error: "Invalid githubUrl field" }, { status: 400 });
            }
            cleanData.githubUrl = githubUrl;
        }

        if (visible !== undefined) {
            if (typeof visible !== 'boolean') {
                return NextResponse.json({ error: "Invalid visible field" }, { status: 400 });
            }
            cleanData.visible = visible;
        }

        if (tags !== undefined) {
            if (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string')) {
                return NextResponse.json({ error: "Invalid tags field" }, { status: 400 });
            }
            cleanData.tags = tags;
        }

        if (appUrl !== undefined) {
            if (typeof appUrl !== 'string' || appUrl.length > 1000) {
                return NextResponse.json({ error: "Invalid appUrl field" }, { status: 400 });
            }
            cleanData.appUrl = appUrl;
        }

        // Update the project with validated data
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