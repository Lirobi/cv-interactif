// @ts-nocheck
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function PUT(
    request: Request,
    { params }: { params: Params }
) {
    try {
        const projectId = parseInt(params.id, 10);
        if (isNaN(projectId)) {
            return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
        }

        const { tags, ...restData } = await request.json();
        let updateData = { ...restData };
        if (tags !== undefined) {
            const tagNames = typeof tags === 'string'
                ? tags.split(",").map(s => s.trim()).filter(Boolean)
                : [];
            updateData.TagOnProject = {
                deleteMany: {},
                create: tagNames.map(name => ({
                    tag: {
                        connectOrCreate: {
                            where: { name },
                            create: { name }
                        }
                    }
                }))
            };
        }

        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: updateData,
            include: { TagOnProject: { include: { tag: true } } }
        });

        return NextResponse.json(updatedProject, { status: 200 });
    } catch (error) {
        console.error("Error updating project:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}