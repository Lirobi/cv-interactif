import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ProjectsManager from "./ProjectsManager";

export default async function ProjectsPage() {
    // Retrieve the authentication token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("adminAuth")?.value;
    if (!token) {
        redirect("/admin/login");
    }

    // Fetch all projects from the database
    const projects = await prisma.project.findMany();

    return (
        <>
            <Header />
            <main className="flex flex-col items-center justify-center">
                {/* Render the interactive projects manager */}
                <ProjectsManager initialProjects={projects} />
            </main>
            <Footer />
        </>
    );
} 