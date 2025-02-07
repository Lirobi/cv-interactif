'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AdminLogin() {
    const [error, setError] = useState('');
    const router = useRouter();


    async function authenticate(username: string, password: string) {

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/admin/authenticate`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
        });
        return res.ok;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');

        // Simulated authentication logic.
        // In production, the authentication should be handled on the server and use secure HTTP-only cookies.
        if (await authenticate(username as string, password as string)) {
            router.push('/admin');
        } else {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="min-h-screen w-screen flex flex-col justify-between">
            <Header />
            <main className="text-center z-50 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center bg-background rounded-xl p-10 w-fit shadow-lg z-50">
                    <h1 className="text-2xl font-bold">Admin Login</h1>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center"
                    >
                        <label className="mb-4">
                            Username:
                            <input type="text" name="username" required className="ml-2 shadow-lg rounded-md border-2 border-foreground" />
                        </label>
                        <label className="mb-4">
                            Password:
                            <input type="password" name="password" required className="ml-2 shadow-lg rounded-md border-2 border-foreground" />
                        </label>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
} 