import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AddProjectPage() {
    // Retrieve the authentication token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('adminAuth')?.value;

    // If no token exists, redirect to login
    if (!token) {
        redirect('/admin/login');
    }

    return (
        <>
            <Header />
            <main className="flex flex-col items-center justify-center">
                <div className="bg-background rounded-xl p-10 w-full max-w-2xl shadow-lg z-50">
                    <h1 className="text-2xl font-bold mb-6">Add New Project</h1>
                    <form action="/api/projects" method="post" className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                rows={4}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium mb-1">
                                Image URL
                            </label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="githubUrl" className="block text-sm font-medium mb-1">
                                GitHub URL
                            </label>
                            <input
                                type="url"
                                id="githubUrl"
                                name="githubUrl"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="reset" className="px-4 py-2 bg-gray-300 rounded-md">
                                Reset
                            </button>
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                Add Project
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
} 