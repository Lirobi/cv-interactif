import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import prisma from "@/lib/prisma";

export default async function ProjectsPage() {
    // Fetch public projects from the database
    const projects = await prisma.project.findMany({
        where: { visible: true },
        include: { TagOnProject: { include: { tag: true } } },
    });

    return (
        <div className="min-h-screen w-screen flex flex-col justify-between">
            <Header />
            <main className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center bg-background max-md:w-5/6 rounded-xl z-50 h-fit p-4 shadow-lg">
                    <h1 className="text-6xl font-bold text-foreground">Projets</h1>
                </div>
                <div className="projects-container flex flex-wrap justify-center gap-4 z-50">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={project.name || "Untitled Project"}
                            description={project.desc || "No description"}
                            imageUrl={project.coverImg || "/default.png"}
                            projectUrl={project.githubUrl || "#"}
                            technologies={project.TagOnProject?.map(t => t.tag.name) || []}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}