import Header from '../components/Header';
import Footer from '../components/Footer';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminPage() {
    // Retrieve the authentication token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('adminAuth')?.value;

    // If no token exists, redirect to login
    if (!token) {
        redirect('/admin/login');
    }

    // Render the Admin Dashboard if authenticated.
    return (
        <>
            <Header />
            <main className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center bg-background rounded-xl p-10 w-fit shadow-lg z-50">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <Link href="/admin/projects" className="underline-animation">Projects manager</Link>
                </div>
            </main>
            <Footer />
        </>
    );
}
