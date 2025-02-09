import { useRouter } from 'next/router';

export default function LoginForm() {
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const credentials = {
            username: formData.get("username") as string,
            password: formData.get("password") as string,
        };

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        try {
            const response = await fetch(`${baseUrl}/api/admin/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
                cache: 'no-store',
                next: { revalidate: 0 },
                signal: AbortSignal.timeout(5000),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Authentication failed');
            }

            router.push("/admin");
        } catch (error) {
            console.error('Login error:', error);
        }
    };
    // ... rest of component
} 