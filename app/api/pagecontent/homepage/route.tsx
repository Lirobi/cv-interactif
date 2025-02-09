import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const rubriques = await prisma.mainPageRubrique.findMany({
        orderBy: {
            order: "asc"
        }
    });
    return NextResponse.json(rubriques);
}


export async function POST(request: Request) {
    const { name, content, order, visible } = await request.json();
    const rubrique = await prisma.mainPageRubrique.create({
        data: { name, content, order, visible }
    });
    return NextResponse.json(rubrique);
}

export async function PUT(request: Request) {
    const { id, name, content, order, visible } = await request.json();
    const rubrique = await prisma.mainPageRubrique.update({
        where: { id },
        data: { name, content, order, visible }
    });
    return NextResponse.json(rubrique);
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    const rubrique = await prisma.mainPageRubrique.delete({
        where: { id }
    });
    return NextResponse.json(rubrique);
}