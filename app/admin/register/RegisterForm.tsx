"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Call the registration API endpoint.
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        try {
            const response = await fetch(`${baseUrl}/api/admin/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                cache: 'no-store',
                next: { revalidate: 0 },
                signal: AbortSignal.timeout(5000),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.error || "Registration failed.");
                return;
            }

            // Redirect to the admin dashboard upon successful registration.
            router.push("/admin");
        } catch (error) {
            console.error('Registration error:', error);
            setError("Registration failed. Please try again later.");
        }
    };

    return (
        <>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <label className="mb-4">
                    Username:
                    <input
                        type="text"
                        name="username"
                        required
                        className="ml-2 shadow-lg rounded-md border-2 border-foreground"
                    />
                </label>
                <label className="mb-4">
                    Password:
                    <input
                        type="password"
                        name="password"
                        required
                        className="ml-2 shadow-lg rounded-md border-2 border-foreground"
                    />
                </label>
                <label className="mb-4">
                    Confirm Password:
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        className="ml-2 shadow-lg rounded-md border-2 border-foreground"
                    />
                </label>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Register
                </button>
            </form>
        </>
    );
} 