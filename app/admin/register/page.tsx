import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { redirect } from "next/navigation";
import RegisterForm from "./RegisterForm";
// This async function queries the registration API to get the current user count.
// In production, you should replace this with an actual database query.
async function getUserCount(): Promise<number> {
    // Use an absolute URL so that the URL can be parsed properly on the server.
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/admin/register`);
    const data = await res.json();
    return data.userCount;
}

// Dynamically import the client component for the registration form.

export default async function RegisterPage() {
    const userCount = await getUserCount();

    // If a user already exists, block registration and redirect to login.
    if (userCount >= 1) {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen w-screen flex flex-col justify-between">
            <Header />
            <main className="text-center flex flex-col items-center justify-center z-50">
                <div className="flex flex-col items-center justify-center bg-background rounded-xl p-10 w-fit shadow-lg">
                    <h1 className="text-2xl font-bold mb-4">Register</h1>
                    <RegisterForm />
                </div>
            </main>
            <Footer />
        </div>
    );
} 