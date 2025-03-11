import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Define which routes require authentication
const PROTECTED_ROUTES = [
    '/api/projects/reorder',
    '/api/projects/[id]',
    '/admin',
];

// Define API routes that should be protected
const PROTECTED_API_ROUTES = [
    '/api/projects/reorder',
    '/api/projects/[id]',
];

// Function to check if a route should be protected
function isProtectedRoute(path: string): boolean {
    return PROTECTED_ROUTES.some(route => {
        // Handle dynamic routes with parameters
        if (route.includes('[') && route.includes(']')) {
            const routePattern = route.replace(/\[.*?\]/g, '[^/]+');
            return new RegExp(`^${routePattern}($|/)`).test(path);
        }
        return path.startsWith(route);
    });
}

// Get JWT secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production";

// Convert string to Uint8Array for jose
const getSecretKey = () => {
    return new TextEncoder().encode(JWT_SECRET);
};

// Verify JWT token
async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, getSecretKey());
        return payload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for non-protected routes
    if (!isProtectedRoute(pathname)) {
        return NextResponse.next();
    }

    // For API routes, check Authorization header
    if (PROTECTED_API_ROUTES.some(route => {
        if (route.includes('[') && route.includes(']')) {
            const routePattern = route.replace(/\[.*?\]/g, '[^/]+');
            return new RegExp(`^${routePattern}($|/)`).test(pathname);
        }
        return pathname.startsWith(route);
    })) {
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.split(' ')[1];

        // If no Authorization header, check for cookie
        if (!token) {
            const adminAuth = request.cookies.get('adminAuth')?.value;

            if (!adminAuth) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }

            // Verify the token from cookie
            const payload = await verifyToken(adminAuth);
            if (!payload) {
                return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
            }
        } else {
            // Verify the token from Authorization header
            const payload = await verifyToken(token);
            if (!payload) {
                return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
            }
        }
    }

    // For admin routes, check the cookie
    if (pathname.startsWith('/admin') && !pathname.includes('/admin/login') && !pathname.includes('/admin/register')) {
        const adminAuth = request.cookies.get('adminAuth')?.value;

        if (!adminAuth) {
            // Redirect to login page
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Verify the token
        const payload = await verifyToken(adminAuth);
        if (!payload) {
            // Token is invalid, redirect to login
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
    matcher: [
        '/admin/:path*',
        '/api/projects/:path*',
    ],
}; 