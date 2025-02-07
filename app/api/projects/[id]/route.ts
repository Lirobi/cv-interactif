// @ts-nocheck
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

interface ProjectData {
    name: string;
    desc: string;
    coverImg: string;
    githubUrl: string;
    tags: string;
}

export async function PUT(
    request: Request,
    { params }: { params: Params }
) {
    try {
        const { id } = params;
        const projectId = parseInt(id, 10);
        if (isNaN(projectId)) {
            return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
        }

        const body = await request.json();
        if (!body) {
            return NextResponse.json({ error: "Request body is required" }, { status: 400 });
        }

        const { tags, ...restData } = body;
        let updateData = { ...restData };

        // First update the project with non-tag data
        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: updateData,
        });

        // Handle tags if they are provided
        if (tags !== undefined) {
            try {
                const tagNames = tags.split(',')
                    .map((tag: string) => tag.trim())
                    .filter(Boolean);

                // Delete existing tag associations
                await prisma.tagOnProject.deleteMany({
                    where: { projectId }
                });

                // Create new tag associations
                if (tagNames.length > 0) {
                    for (const tagName of tagNames) {
                        // Find or create tag
                        const tag = await prisma.tag.upsert({
                            where: { name: tagName },
                            create: { name: tagName },
                            update: {}
                        });

                        // Create association
                        await prisma.tagOnProject.create({
                            data: {
                                projectId,
                                tagId: tag.id
                            }
                        });
                    }
                }
            } catch (error) {
                console.error("Error updating tags:", error);
                return NextResponse.json({ error: "Error updating tags" }, { status: 500 });
            }
        }

        // Fetch the final project state with tags
        const finalProject = await prisma.project.findUnique({
            where: { id: projectId },
            include: { TagOnProject: { include: { tag: true } } }
        });

        return NextResponse.json(finalProject);
    } catch (error) {
        console.error("Error updating project:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}