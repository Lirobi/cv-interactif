import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Helper function to add CORS headers
function corsHeaders() {
    const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
    const origin = '*';  // Default to allow all in development

    // In production, you might want to be more restrictive
    if (process.env.NODE_ENV === 'production') {
        // You can add production origin validation here
    }

    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
    };
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET() {
    const rubriques = await prisma.mainPageRubrique.findMany({
        orderBy: {
            order: "asc"
        }
    });
    return NextResponse.json(rubriques, { headers: corsHeaders() });
}

export async function POST(request: Request) {
    const { name, content, order, visible } = await request.json();
    const rubrique = await prisma.mainPageRubrique.create({
        data: { name, content, order, visible }
    });
    return NextResponse.json(rubrique, { headers: corsHeaders() });
}

export async function PUT(request: Request) {
    const { id, name, content, order, visible } = await request.json();
    const rubrique = await prisma.mainPageRubrique.update({
        where: { id },
        data: { name, content, order, visible }
    });
    return NextResponse.json(rubrique, { headers: corsHeaders() });
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    const rubrique = await prisma.mainPageRubrique.delete({
        where: { id }
    });
    return NextResponse.json(rubrique, { headers: corsHeaders() });
}