import { NextResponse } from 'next/server';

// Helper function to check authentication for /admin paths
function isAuthenticated(request: Request): boolean {
    // Extract the pathname from the request URL
    const { pathname } = new URL(request.url);

    // Only enforce authentication for /admin paths
    if (!pathname.startsWith('/admin')) return true;

    // Retrieve the Authorization header (expects "Bearer <token>")
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return false;

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    // Placeholder token validation logic
    // Replace 'my-secure-admin-token' with your actual token or validation method.
    return token === 'my-secure-admin-token';
}

export async function GET(request: Request) {
    // Check if the request is to an /admin path and enforce authentication if needed.
    if (!isAuthenticated(request)) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized access' }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Process the GET request for your user endpoint.
    return NextResponse.json({ message: 'User endpoint accessed successfully' });
}

export async function POST(request: Request) {
    // Enforce authentication only for /admin paths.
    if (!isAuthenticated(request)) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized access' }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Proceed to process the incoming JSON from the POST request.
    const data = await request.json();
    return NextResponse.json({ message: 'POST success', data });
}
