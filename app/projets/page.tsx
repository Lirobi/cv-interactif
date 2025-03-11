'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import { Project } from "@/lib/types/Project";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                const data = await response.json();
                // Sort projects by order
                const sortedProjects = [...data].sort((a, b) => a.order - b.order);
                setProjects(sortedProjects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Create an array of 4 loading cards
    const loadingCards = Array(1).fill(null).map((_, index) => (
        <ProjectCard
            key={`loading-${index}`}
            title="Loading..."
            description=""
            imageUrl="/default.png"
            projectUrl="#"
            tags={[]}
            appUrl={null}
        />
    ));

    return (
        <div className="min-h-screen w-full flex flex-col justify-between overflow-x-hidden">
            <Header />
            <main className="flex flex-col items-center justify-center py-8 pb-16">
                <div className="flex flex-col items-center justify-center bg-background max-md:w-5/6 rounded-xl z-50 h-fit p-4 shadow-lg mb-8">
                    <h1 className="text-6xl max-sm:text-4xl font-bold text-foreground">Projets</h1>
                </div>
                <div className="w-full max-w-7xl px-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-full p-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 max-md:border-foreground border-white"></div>
                        </div>
                    ) : (
                        <div className="flex flex-wrap justify-center gap-6 z-50">
                            {projects.map((project) => (
                                <div key={project.id} className="flex justify-center">
                                    <ProjectCard
                                        title={project.name || "Untitled Project"}
                                        description={project.desc || "No description"}
                                        imageUrl={project.coverImg || "/default.png"}
                                        projectUrl={project.githubUrl || "#"}
                                        tags={project.tags || []}
                                        appUrl={project.appUrl || null}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}